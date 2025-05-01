import { NextFunction, Request, Response } from 'express';
import admin from '../config/firebase-config';

class Middleware {
    async decodeToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            console.log('Token:', token);
            const decodeValue = await admin.auth().verifyIdToken(token!);
            if (!decodeValue) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            req.headers['uid'] = decodeValue.uid;
            return next();
        } catch (error) {
            return res.status(500).json({ error: 'Internal error' });
        }
    }
}

export default new Middleware();
