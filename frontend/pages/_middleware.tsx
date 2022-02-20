import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { NextApiRequest } from "next"

export async function middleware(req: NextApiRequest) {
  const url = req.url
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  })

  if (url?.includes("/admin") && !session) {
    const parsedUrl = new URL(url)
    parsedUrl.pathname = "/stop"
    return NextResponse.redirect(parsedUrl.href)
  }
}
