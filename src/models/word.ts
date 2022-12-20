import { Document, Schema, model } from "mongoose";

export interface word {
    word: string;
    uses: number;
}

export interface wordModel extends word, Document {}

const wordSchema: Schema = new Schema(
    {
        word: { type: String, required: true },
        uses: { type: Number, required: true },
<<<<<<< HEAD
=======
        date: { type: Date, required: false },
>>>>>>> bcf63dc (update)
    },
    { versionKey: false }
);

export default model<wordModel>("word", wordSchema);
