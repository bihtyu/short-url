import { VercelRequest, VercelResponse } from '@vercel/node'
const { MongoClient } = require('mongodb');
import { MONGODB_CONNECTION_STRING, DB_NAME } from '../DBConfig.js' 

export default async (req: VercelRequest, res: VercelResponse): Promise<any> => {
  const client = new MongoClient(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

  const collection = await client.connect(err => {
    const collection = client.db(DB_NAME).collection("links")
    return collection
  })

  const result = collection.find().toArray()

  client.close()

  // return res.send({ code: 20000, result: 'you got me!' })
  
  res.status(200).json(result)
}
