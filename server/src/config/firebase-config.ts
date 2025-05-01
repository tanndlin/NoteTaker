import admin, { ServiceAccount } from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(
    fs.readFileSync('./src/config/serviceAccount.json', 'utf8')
) as ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export default admin;
