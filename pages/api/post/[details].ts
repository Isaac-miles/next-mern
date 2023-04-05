// 'use client'
import prisma from '../../../prisma/client'
import { NextApiRequest, NextApiResponse } from "next"

const {log}= console


export default async function Posts(req:NextApiRequest, res:NextApiResponse) {
  log(req.query)
  if (req.method === 'GET') {
   
    try {
     const result = await prisma.post.findUnique({
      where: {
        id:req.query.details
      },
      include:{
        user:true,
        comment:{
          orderBy:{
            createdAt:"asc"
          },
          include:{
            user:true
          }
        }
      }
     })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({message: error.message})
    }
  } 
  } 