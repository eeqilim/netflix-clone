import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    // Why we are not checking if the currentUser exists first?
    // Because we did all of that in our serverAuth 
    // If there is no currentUser, we are going to throw an error and this error is going to be caught here and we are going to see it when logged in our server.
    try {
        const { currentUser } = await serverAuth(req, res);
        return res.status(200).json(currentUser);
    
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
