'use client'
import CreatePost from "./component/addPost"
import axios, { AxiosError } from "axios";
import toast,{ Toaster } from 'react-hot-toast'
import {useQuery} from "@tanstack/react-query"
import Post from "./component/post";
import { PostType } from "./types/post";

//fetch all post
const allPost = async()=>{
  const res = await axios.get('/api/post/getPost')
  return res.data;
}

export default function Home() {
  const {data, error, isLoading} = useQuery<PostType[]>({
    queryFn: allPost,
    queryKey: ['posts'],
  })


    if(error instanceof AxiosError){
      toast.error(error?.response?.data.message)
    console.log(error)
  }
  if(isLoading) return "Loading..."
  
  return (
    <main >
        <Toaster/>
      <CreatePost/>
      {data?.map((post) =>(
        <Post key={post.id} 
        comments ={post.comment}
        name={post.user.name}
         avatar={post.user.image} 
         postTitle ={post.title} 
         id= {post.id}
       
         />
      ))}
    </main>
  )
}
