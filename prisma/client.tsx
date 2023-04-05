
import { PrismaClient } from "@prisma/client"

declare global{
  namespace NodeJS{
    interface Global {

    }
  }
}
//add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global{
  prisma: PrismaClient
}
// declare global {
//   var prisma: PrismaClient | undefined
// }

//prevent multiple instances of prisma Client in development
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma
// import { PrismaClient } from "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined
// }

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// export default client