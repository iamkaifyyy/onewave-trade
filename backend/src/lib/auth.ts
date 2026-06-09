import { z } from 'zod';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type UserCredentials = z.infer<typeof userSchema>;

// Use a globalThis singleton so the in-memory store survives hot reloads in dev.
declare global {
  // eslint-disable-next-line no-var
  var __users: Map<string, { email: string; password: string; id: string }> | undefined;
}

const users: Map<string, { email: string; password: string; id: string }> =
  globalThis.__users ?? (globalThis.__users = new Map());

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
        user: {
            id,
            email,
            balance: 100000,
            portfolio: {},
        },
    };
}

export async function login(credentials: UserCredentials){
    const {email, password} = userSchema.parse(credentials);

    const user = users.get(email);
    if(!user){
        throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Invalid Credentials');
    }

    const token = jwt.sign({
        email,
        id: user.id
    },
    JWT_SECRET,
    {
        expiresIn: '24h'
    });

    return {
        token,
        user:{
            id: user.id,
            email,
            balance: 100000,
            portfolio: {},
        },
    }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; id: string };
  } catch {
    throw new Error('Invalid token');
  }
}
