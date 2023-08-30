// API Route

import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // We only want to allow the post call to the slash API slash route
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    
    try {
        // Extract email, name, password from the req.body
        const { email, name, password } = req.body;

        // We want to check if an email has taken
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            return res.status(422).json({ error: 'Email taken' });
        }

        // Need to include await function because it is asynchronous
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
