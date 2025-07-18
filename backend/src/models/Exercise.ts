import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
  title: string;
  content: string;
  type: string;
  programId: mongoose.Types.ObjectId;
  order: number;
}

const ExerciseSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  type: { type: String },
  programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);
