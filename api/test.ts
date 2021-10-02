import { VercelRequest, VercelResponse } from '@vercel/node'
export default async (req: VercelRequest, res: VercelResponse): Promise<any> => {
  console.log(req)
  console.log(res)
  return res.send({ result: 'you got me!' })
}
