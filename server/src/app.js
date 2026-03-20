import express from 'express';
import cors from 'cors';
import ENV from './config/env.js';
import { checkScam } from './controller/check-scam.controller.js';

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());

app.post("/api/check-scam", checkScam);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the ScamShield API!' });
});

export default app;