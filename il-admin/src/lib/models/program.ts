import { ObjectId } from 'mongodb';

export interface ProgramModel {
  _id?: ObjectId;
  title: string;
  description: string;
  image: string;
  lessons: ObjectId[];
  active: boolean;
  createdAt: Date;
}
