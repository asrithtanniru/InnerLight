import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  name: string;
  description: string;
  icon: string;
  unlockedBy: mongoose.Types.ObjectId[];
}

const AchievementSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  unlockedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
