import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  day: number;
  completed: boolean;
  minutesSpent: number;
}

const UserProgressSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  day: { type: Number },
  completed: { type: Boolean, default: false },
  minutesSpent: { type: Number, default: 0 },
});

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
