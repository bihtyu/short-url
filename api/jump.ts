import { VercelRequest, VercelResponse } from '@vercel/node'
import storage from '../DB'

export default async (req: VercelRequest, res: VercelResponse): Promise<any> => {
  const { slug } = req.query

  if (typeof slug !== 'string' || slug === '') {
    return res.status(400).send('Bad Request')
  }

  try {
    // 连接数据库
    await storage.connect()
    const url = await storage.getUrlBySlug(slug)

    if (url === '') {
      return res.status(404).send('Not Found')
    }

    res.redirect(url)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
