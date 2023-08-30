// The purpose of the following code is for NextJS hot reloading (on every code change, our code updates and reruns); 
// Prisma creates a bunch of new PrismaClient instances, which will lead to error saying that too much Prisma instances
// To avoid that, we save Prisma client in a global file Global files that are not affected by hot reloading which is why it works (common practice)

import { PrismaClient } from '@prisma/client'

const client = global.prismadb || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prismadb = client

export default client
