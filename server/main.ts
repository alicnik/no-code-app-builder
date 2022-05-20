import express from 'express';
import type { Express } from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/api/', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
