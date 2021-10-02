const { MongoClient } = require('mongodb');

const MONGODB_CONNECTION_STRING = "mongodb+srv://bihtyu:afvbLDbUTbN9rxm@shorturlonmongodb.fjepg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const DB_NAME = "SHORT_URL"

const client = new MongoClient(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(async err => {
//   const collection = client.db(DB_NAME).collection("links");
//   const result = await collection.find().toArray()
//   console.log(result)
// });

async function _connect() {
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

(async function() {
  // client.connect(async err => {
  //   const collection = client.db(DB_NAME).collection("links");
  //   const result = await collection.find().toArray()
  //   console.log(result)
  // });

  const db = await _connect()
  const links = await getCollection(db, 'links')
  const result = await getAllInCollection(links)

  console.log(result)
})()

