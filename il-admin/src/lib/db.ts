import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/IL';

const options: MongoClientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

// if (process.env.NODE_ENV === 'development') {

//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise!;
// } else {
client = new MongoClient(uri, options);
clientPromise = client.connect();
// }

export default clientPromise;
