import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import fs from 'fs';

const serviceAccount = JSON.parse(
    fs.readFileSync('./src/config/serviceAccount.json', 'utf8')
) as ServiceAccount;

const app = initializeApp({
    credential: cert(serviceAccount)
});

export default app;
