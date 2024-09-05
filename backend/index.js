import express from "express";
import connectToMongo from "./db.js";
import authRouter from './routes/auth.js';
import itemRouter from "./routes/items.js";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/', authRouter);
app.use('/', itemRouter);

const PORT = process.env.PORT || 5000;

const __DIR__ = path.resolve();
if(process.env.NODE_ENV === 'prod'){
    app.use(express.static(path.join(__DIR__, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__DIR__, "frontend", "build", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`App is listining at : http://localhost:${PORT}`)
    connectToMongo()
});
