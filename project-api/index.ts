import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import linkRouter from "./routers/links";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/links', linkRouter)

const run = async () => {
    await mongoose.connect(`mongodb://localhost/links`);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })

    process.on('exit', () => {
        mongoose.disconnect();
    })
}
run().catch(console.error);
