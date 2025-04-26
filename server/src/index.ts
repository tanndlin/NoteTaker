import { config } from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import {
    CreateNoteResponse,
    GetNotesResponse,
    GoodResponse,
    Response
} from './types';

config();

const app = express();
const port = 3000;

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.MONGODB_DB_NAME!);
const notesCollection = db.collection('notes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get<Response<GoodResponse<GetNotesResponse>>>(
    '/notes',
    async (req, res) => {
        try {
            const uid = req.query.uid as string;
            if (!uid) {
                res.status(400).json({ error: 'UID is required' });
                return;
            }

            const notes = await notesCollection.find().toArray();
            res.status(200).json({ notes });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch notes' });
        }
    }
);

app.post<Response<GoodResponse<CreateNoteResponse>>>(
    '/notes',
    async (req, res) => {
        try {
            const { title, body, directory, id } = req.body;
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
    }
);

// Sample endpoint with typed response
app.get<Response<GoodResponse<{ message: string }>>>(
    '/api/sample',
    (req, res) => {
        res.json({ data: { message: 'This is a sample endpoint!' } });
    }
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
