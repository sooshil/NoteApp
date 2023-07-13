import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteModel from "./models/note"

const app = express();

app.get("/", async (req, res, next) => {
    try {
        // throw Error("Ohh Gosh!")
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
        let errorMessage = "An unknown error occured";
        if (error instanceof Error) errorMessage = error.message;
        res.status(500).json({ error: errorMessage });
})

export default app;




https://youtu.be/FcxjCPeicvU?t=5866