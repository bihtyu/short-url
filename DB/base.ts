import { customAlphabet } from 'nanoid'

export const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

export default abstract class BaseStorage {
  async createSlug(): Promise<string> {
    // const slug = nanoid()
    // const exists = await this.getUrlBySlug(slug)
    // if (!exists) return slug
    // return await this.createSlug()
    return nanoid()
  }

  abstract addLink(url: string, slug?: string): Promise<string>

  abstract getUrlBySlug(slug: string): Promise<string | undefined>

  abstract getSlugByUrl(url: string): Promise<string | undefined>
}
