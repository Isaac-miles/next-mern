'use client'

import Post from "../../../app/component/post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostsType } from "../../../app/types/posts"
import AddComment from "../../../app/component/addComment"
import Image from "next/image"

type URL ={
  params: {
    slug:string
  }
}
const fetchDetails = async(slug: string) =>{
  const response = await axios.get(`api/postDetail/${slug}`)
  return response.data
}

export default function PostDetail(url:URL){
  // const {data, error, isLoading} = useQuery<PostsType[]>({
  const {data, error, isLoading} = useQuery({
    queryFn: ()=>fetchDetails(url.params.slug),
    queryKey:['post-detail']
  })
 

console.log(data)

  if(isLoading) return "Loading"
  console.log(data)
  return (
    <div>
 
      <Post id={data?.id} name={data.user.name} 
      avatar={data.user.image} comments={data.comment}
       postTitle={data.post.postTitle}
       key={data.id}/>
       <AddComment id={data?.id}/>
       {data?.comment?.map((comment)=>(
          <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
            <div className="flex items-center gap-2">
              <Image width={24} height={24} src={comment.user?.image} alt="avatar"/>
              <h3 className="font-bold">{comment?.user?.name}</h3>
              <h3 className="text-sm">{comment?.createdAt}</h3>
            </div>
            <div className="py-4">{comment.comments}</div>
          </div>
       ))}
    </div>
  )
}