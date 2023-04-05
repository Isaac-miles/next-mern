'use client'

import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Image from "next/image"
import { useState } from "react"
import Toggle from "./toggle"
import toast from 'react-hot-toast'

type EditProps = {
  id:string
  avatar:string
  name:string
  title:string 
  comments?:{
    id:string
    postId:string 
    userId:string
  }[]
}

export default function EditPost({avatar, name, title, comments, id}: EditProps){
  let deleteTostId:string
  const queryClient = useQueryClient()
  const [toggle, setToggle] = useState(false)
  const {mutate }= useMutation(
    async (id:string)=> await axios.delete('/api/post/deletePost', {data:id}),
    {
      onError:(error)=>{
        if(error instanceof AxiosError){
          toast.error("error deleting post", {id: deleteTostId})
        }
      } ,
      onSuccess:(data)=>{
        toast.success("Post deleted", {id: deleteTostId})
        queryClient.invalidateQueries(['auth-posts'])
        // setToggle(false)
      }
    }
  )

  const deletePost =()=>{
    deleteTostId = toast.loading("Deleting Post")
    mutate(id)
  }

  return (
    <>
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image src={avatar} width={32} height={32} alt="avatar"/>
        <h3 className="font-bold text-gray-700 ">{name}</h3>
        {/* <h3 className="font-bold text-gray-700 ">{title}</h3> */}
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-gray-700">{comments?.length} comment</p>
      <button className="text-sm font-bold text-red-500"
      onClick={(e)=>setToggle(true)}
      >Delete</button>
      </div>
    </div>

   { toggle && <Toggle deletePost={deletePost} setToggle ={setToggle}/>}
    </>
  )
}