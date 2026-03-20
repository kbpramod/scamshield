import express from 'express';
import cors from 'cors';
import ENV from './config/env.js';
import { checkScam } from './controller/check-scam.controller.js';
import { upload } from './middleware/upload.js';

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());

app.post("/api/check-scam", upload.single("image"), checkScam);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the ScamShield API!' });
});

export default app;