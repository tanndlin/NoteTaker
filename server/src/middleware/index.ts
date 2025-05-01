import { NextFunction, Request, Response } from 'express';
import admin from '../config/firebase-config';

class Middleware {
    async decodeToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

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

    parseRequiredFields(requiredFields: string[]) {
        return (req: any, res: any, next: any) => {
            const missingFields = requiredFields.filter(
                (field) => !req.body[field]
            );
            if (missingFields.length) {
                return res.status(400).json({
                    error: `Missing fields: ${missingFields.join(', ')}`
                });
            }

            return next();
        };
    }
}

export default new Middleware();
