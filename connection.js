
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.ATLAS_URI
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let connection
try {
  connection = await client.connect()
} catch (error) {
  console.log(error)
}

const database = client.db('spocdb')

export default database


