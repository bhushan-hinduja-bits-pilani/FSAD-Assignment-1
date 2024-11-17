// src/models/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

const connectToDb = async () => {
  if (!db) {
    await client.connect();
    db = client.db("book_exchange_platform");
    console.log("Connected to MongoDB.");
  }
  return db;
};

export default connectToDb;
