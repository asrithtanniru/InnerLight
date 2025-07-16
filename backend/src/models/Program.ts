import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  description: string;
}

const ProgramSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<IProgram>('Program', ProgramSchema);
