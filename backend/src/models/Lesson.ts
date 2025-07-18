import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  content: string;
  programId: mongoose.Types.ObjectId;
  order: number;
}

const LessonSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.model<ILesson>('Lesson', LessonSchema);
