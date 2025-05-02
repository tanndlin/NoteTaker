import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import middleware from './middleware.js';
import {
    CreateNoteResponse,
    DeleteNoteResponse,
    GetNotesResponse,
    NoteBase,
    Response
} from './types.js';

import functions from 'firebase-functions';

config();

const app = express();
app.use(
    cors({
        origin: true
    })
);
app.use((req, res, next) => {
    middleware.decodeToken(req, res, next).catch(next);
});
app.use(middleware.removeDuplicatePath);

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.MONGODB_DB_NAME!);
const notesCollection = db.collection<NoteBase>('notes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get<Response<GetNotesResponse>>('/api/notes', async (req, res) => {
    try {
        const notes = (await notesCollection.find().toArray()) ?? [];
        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

app.use(
    '/api/notes/create',
    middleware.parseRequiredFields(['title', 'body', 'directory', 'id'])
);
app.post<Response<CreateNoteResponse>>(
    '/api/notes/create',
    async (req, res) => {
        try {
            const { title, body, directory, id } = req.body;
            const updatedAt = Date.now();
            const newNote = {
                title,
                body,
                directory,
                id,
                updatedAt,
                deleted: false
            };

            const existingNote = await notesCollection.findOne({ id });
            if (existingNote) {
                await notesCollection.updateOne({ id }, { $set: newNote });
            } else {
                await notesCollection.insertOne(newNote);
            }

            res.status(201).json({
                message: 'Note created successfully'
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create note' });
        }
    }
);

app.use('/api/notes/delete', middleware.parseRequiredFields(['id']));
app.post<Response<DeleteNoteResponse>>(
    '/api/notes/delete',
    async (req, res) => {
        try {
            const { id } = req.body;
            const deletedNote = { id, deleted: true };

            const existingNote = await notesCollection.findOne({ id });
            if (existingNote) {
                await notesCollection.updateOne({ id }, { $set: deletedNote });
            } else {
                await notesCollection.insertOne(deletedNote);
            }

            res.status(201).json({
                message: 'Note deleted successfully'
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create note' });
        }
    }
);

app.get(/(.*)/, (req, res) => {
    res.status(200).json({
        message: `Hello from the server! You requested url: ${req.url}`
    });
});

const port = process.env.LISTEN_PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export const api = functions.https.onRequest(app);
