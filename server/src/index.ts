import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import middleware from './middleware';
import { CreateNoteResponse, GetNotesResponse, Response } from './types';

config();

const app = express();
app.use(cors());
app.use((req, res, next) => {
    middleware.decodeToken(req, res, next).catch(next);
});

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.MONGODB_DB_NAME!);
const notesCollection = db.collection('notes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get<Response<GetNotesResponse>>('/api/notes', async (req, res) => {
    try {
        const notes = await notesCollection.find().toArray();
        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

app.post<Response<CreateNoteResponse>>('/api/notes', async (req, res) => {
    try {
        const { title, body, directory, id } = req.headers;
        if (!title || !body || !directory || !id) {
            res.status(400).json({
                error: 'Title, body, directory, and ID are required'
            });
            return;
        }

        const newNote = { title, body, directory, id };
        await notesCollection.insertOne(newNote);
        res.status(201).json({
            message: 'Note created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
