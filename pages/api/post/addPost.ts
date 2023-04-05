'use client'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../prisma/client'

const {log}= console


export default async function Posts(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if(!session) return res.status(401).json({message: "please sign in to make a post"})

      // res.status(200).json({data: req.body})
    const title = req.body.title;

    //get user
    const prismaUser = await prisma.user.findUnique({
      where:{email: session?.user?.email}
    })
    //check title
    if(title.length > 300)  return res.status(403).json({message: "Max length  exceeded"})
    if(!title.length)  return res.status(403).json({message: "title must not be empty"})

    // create post if all checks passed
    try {
     const result = await prisma.post.create({
      data: {
        title,
        userId: prismaUser?.id

      }
     })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({message: error.message})
    }
  } else {
    // Handle any other HTTP method
  }
}
