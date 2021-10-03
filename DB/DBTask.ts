const { MongoClient } = require('mongodb')
import BaseStorage from './base'
import { MONGODB_CONNECTION_STRING, DB_NAME } from './config.js'

const client = new MongoClient(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const COLLECTION_NAME = 'links'
let DB = null
let LINKS = null

export default class DBTask extends BaseStorage {
  constructor() {
    super()
  }

  async connect() {
    await client.connect()
    DB = DB || client.db(DB_NAME)
    LINKS = LINKS || await DB.collection(COLLECTION_NAME)
  }
  
  async addLink(url: string, slug?: string): Promise<string> {
    slug = slug || await this.createSlug()
    await LINKS.insertOne({ slug, url })
    return slug
  }

  async getUrlBySlug(slug: string): Promise<string | undefined> {
    const data = await LINKS.find({ slug }).toArray()
    if (data.length === 0) return ''
    return data[0].url
  }

  async getSlugByUrl(url: string): Promise<string | undefined> {
    const data = await LINKS.find({ url }).toArray()
    if (data.length === 0) return ''
    return data[0].slug
  }
}
