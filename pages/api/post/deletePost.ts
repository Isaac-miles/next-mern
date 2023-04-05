'use client'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../prisma/client'
import { NextApiRequest, NextApiResponse } from "next"

const {log}= console


export default async function Posts(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)
    if(!session) return res.status(401).json({message: "sign in please"})


    // Delete a Posts
    try {
      const postId = req.body
      const result = await prisma.post.delete({

        where:{
          id:postId
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
