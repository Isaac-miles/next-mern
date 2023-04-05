"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast'


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient()
  let toastPostId:string

  //create post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/post/addPost", {title}),

{
  onError:(error)=>{
    if(error instanceof AxiosError){
      toast.error(error?.response?.data.message, {id: toastPostId})
      queryClient.invalidateQueries(["posts"])
      setIsDisabled(false)

    }
  } ,
  onSuccess:(data)=>{
    toast.success("Post Successful", {id: toastPostId})
    queryClient.invalidateQueries(["posts"])
    setTitle('')
    setIsDisabled(false)
  }


}
  )
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading("Sending Post", {id: toastPostId, duration:500})
    setIsDisabled(true)
    mutate(title);
  
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-5 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" what do you thing?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p
          className={`text-sm font-bold ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
          type="submit"
          disabled={isDisabled}
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
