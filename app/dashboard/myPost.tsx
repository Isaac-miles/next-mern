'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import EditPost from "./editPost"

const {log} = console


const getAuthPost = async ()=>{
  const response = await axios.get('/api/post/authPost')
  return response.data
}

export default function MyPosts(){
const {data, isLoading} = useQuery({
  queryFn: getAuthPost,
  queryKey:["auth-posts"]
})

if(isLoading) return <h1>Loading...</h1>
log(data)
  return (
    <div>
    {data?.post.map((post)=>(
      <EditPost key={post.id}
       id={post.id} 
       avatar={data.image} 
       name={data.name} 
       title={post.title} 
       comments={post.comment}/>
    ))}
    </div>
  )
}