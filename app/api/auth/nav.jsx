import Link from "next/link";
import Logged from "./Logged"
import Login from "./login"

import { getServerSession } from "next-auth/next"
import { authOptions } from "./[...nextauth]"


 const {log} = console;

 export default async function  Nav(){
  const session = await getServerSession(authOptions);
  // log(session)
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={'/'} passHref>
       <h1 className="font-bold text-lg">Send it</h1>
      </Link>
      <ul className="flex items-center gap-6">
      {!session?.user  && <Login/>}
      {session?.user  && <Logged image={session.user?.image}/>}
      </ul>
    </nav>
 
  )
  }