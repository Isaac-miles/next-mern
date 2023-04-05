'use client'

import { getServerSession } from "next-auth/next"
import { authOptions } from "./[...nextauth]"

const {log}= console


export default async function Posts(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if(!session) return res.status(401).json({message: "please sign in to make a post"})

    log(req.body)
  } else {
    // Handle any other HTTP method
  }
}
