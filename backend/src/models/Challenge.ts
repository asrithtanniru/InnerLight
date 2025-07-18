import mongoose, { Schema, Document } from 'mongoose';

export interface IChallenge extends Document {
  title: string;
  description: string;
  programId: mongoose.Types.ObjectId;
  day: number;
  completedBy: mongoose.Types.ObjectId[];
}

const ChallengeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  day: { type: Number },
  completedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);
