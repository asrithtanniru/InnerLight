
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/IL';
const options: MongoClientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient | null = null;

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
  }
  return client;
}
