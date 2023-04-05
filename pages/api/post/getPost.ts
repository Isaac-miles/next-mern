'use client'

import prisma from '../../../prisma/client'
import { NextApiRequest, NextApiResponse } from "next"
const {log}= console


export default async function Posts(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {

    // fetch all post 
    
    try {
     const data = await prisma.post.findMany({
      include:{
        user: true,
        comment:true,
      },
      orderBy:{
        createdAt: "asc"
      }
     })
      res.status(200).json(data)
    } catch (error) {
      res.status(403).json({message: error.message})
    }
  } else {
    // Handle any other HTTP method
  }
}
