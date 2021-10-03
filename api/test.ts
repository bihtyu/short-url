import { VercelRequest, VercelResponse } from '@vercel/node'
const { MongoClient } = require('mongodb')
import { MONGODB_CONNECTION_STRING, DB_NAME } from '../DB/config.js'

async function _connect(client) {
  return await new Promise(resolve => {
    client.connect((err, client) => {
      resolve(client.db(DB_NAME))
    })
  })
}

async function getCollection(db, collectionName) {
  return await new Promise(resolve => {
    resolve(db.collection(collectionName))
  })
}

async function getAllInCollection(collection) {
  return await new Promise(resolve => {
    resolve(collection.find().toArray())
  })
}

export default async (req: VercelRequest, res: VercelResponse): Promise<any> => {
  const client = new MongoClient(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = await _connect(client)
  const links = await getCollection(db, 'links')
  const result = await getAllInCollection(links)

  return res.send({ result: result })

  // client.connect(async err => {
  //   const collection = client.db(DB_NAME).collection("links");
  //   const result = await collection.find().toArray()
  //   // client.close();
  //   return res.send({ result: result })
  //   // res.status(200).json(result)
  // });

  // return res.send({ code: 20000, result: 'you got me!' })
}
