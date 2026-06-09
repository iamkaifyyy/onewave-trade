import { z } from 'zod';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),

});

export type UserCredentials = z.infer<typeof userSchema>;


const users = new Map<
  string,
  { email: string; password: string; id: string }
>();

export async function register(credentials: UserCredentials) {
    const { email, password } = userSchema.parse(credentials);

    if(users.has(email)){
        throw new Error('user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Math.random().toString(36).substring(2, 11);

    users.set(email, {
        email,
        password: hashedPassword,
        id,
    })

    const token = jwt.sign({ email, id}, JWT_SECRET, { expiresIn: '24h'});

    return {
        token, 
        user: { id,
            email,
            balance: "100,000",
            portfolio: {},
        },
    };
}

