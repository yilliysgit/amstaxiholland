// src/lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGODB_URI!;
  const dbName = process.env.MONGODB_DB!;
  if (!uri || !dbName) throw new Error("Missing MONGODB_URI or MONGODB_DB");

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}
