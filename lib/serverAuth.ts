import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// We are going to use this serverAuth in all of our API routes to check whether we are logged in, so we do not have to type this many times.
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    
    // Use this server(or API controller) to pass the request parameter. 
    // That request parameter is going to hold the JWT token which this getSession can then use to get our logged in user.
    // But the session does not have all the fields(that we defined in our Prisma) which is why we use the session to get other fields.
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }
    
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
    
    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser };
};

export default serverAuth;
