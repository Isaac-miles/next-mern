'use client'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../prisma/client'
import { NextApiRequest, NextApiResponse } from "next"

const {log}= console


export default async function Posts(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)
    if(!session) return res.status(401).json({message: "sign in please"})


    // Get Auth Users Posts
    try {
     const data = await prisma.user.findUnique({
        where:{
          email: session.user?.email
        },
        include:{
          post:{
            orderBy:{
              createdAt:"asc"
            },
            include:{
              comment:true
            }
          }
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
