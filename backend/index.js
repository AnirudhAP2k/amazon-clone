import express from "express";
import { PORT } from "./config.js";
import connectToMongo from "./db.js";
import authRouter from './routes/auth.js';
import itemRouter from "./routes/items.js";

const app = express();

app.use(express.json());

app.use('/', authRouter);
app.use('/', itemRouter);

app.listen(PORT, () => {
    console.log("App is listining at : ", PORT)
    connectToMongo()
});
