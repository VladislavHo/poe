// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default prisma

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()



if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma