import { MongoClient } from "mongodb";
import dotenv  from 'dotenv'

dotenv.config()

const client = new MongoClient(process.env.DATABASE_URL)

try{
    await client.connect()
} catch(err){
    console.log("Não foi conectado")
    console.log(err.message)
}
export const db = client.db()