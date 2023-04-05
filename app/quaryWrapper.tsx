'use client'
import {ReactNode} from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast";


interface Props {
  children?: ReactNode
}

const queryClient = new QueryClient();

function QuaryWrapper({children}: Props) {
  return (
    <QueryClientProvider client={queryClient} >
      <Toaster/>
      {children}
    
    </QueryClientProvider>
  )
}

export default QuaryWrapper