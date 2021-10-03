import { VercelRequest, VercelResponse } from '@vercel/node'
import storage from '../DB'

export default async (req: VercelRequest, res: VercelResponse): Promise<any> => {
  const params = req.body ?? req.query
  const { url = '', slug = '' } = params as { url?: string, slug?: string }

  // 校验 url
  if (url === '') {
    return res.status(400).send({ message: 'url 不能为空' })
  }

  // 校验 slug
  if (slug.length !== 0 && (slug.length < 2 || slug.length > 10)) {
    return res.status(400).send({ message: '自定义参数异常' })
  }

  const getForwarded = (name: string): string => req.headers[`x-forwarded-${name}`]?.toString() ?? ''

  try {
    // 发起地址
    const origin = `${getForwarded('proto')}://${getForwarded('host')}/`
    // 连接数据库
    await storage.connect()

    // slug 不为空，判断该数据是否存在
    if (slug !== '') {
      const existUrl = await storage.getUrlBySlug(slug)
      // 在数据库找到一样的，直接返回
      if (existUrl === url) {
        return res.send({ slug, link: origin + slug })
      }
      // 已存在
      if (existUrl !== '') {
        return res.status(400).send({ message: '自定义参数已存在' })
      }
    }
  
    // 根据 slug 检查
    const existSlug = await storage.getSlugByUrl(url)
    if (existSlug !== '' && slug === '') {
      return res.send({ slug: existSlug, link: origin + existSlug })
    }
    // 存下来，并返回
    const newSlug = await storage.addLink(url, slug)
    res.send({ slug: newSlug, link: origin + newSlug })
  } catch(e) {
    return res.status(500).send({ message: e.message })
  }
}
