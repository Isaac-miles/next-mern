'use client'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../prisma/client'

const {log}= console


export default async function Posts(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if(!session) return res.status(401).json({message: "please sign in to add a comment"})

    //get user
    const prismaUser = await prisma.user.findUnique({
      where:{email: session?.user?.email}
    })
  
    try {
      const {title, postId} = req.body.data
      if(!title.length){
        res.status(401).json({message:"comment cant be empty"})
      }

      const result = await prisma.comment.create({
        data:{
          comments: title,
          userId:prismaUser?.id,
          postId
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
