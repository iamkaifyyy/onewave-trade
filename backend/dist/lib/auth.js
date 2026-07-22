"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
exports.register = register;
exports.login = login;
exports.verifyToken = verifyToken;
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const users = (_a = globalThis.__users) !== null && _a !== void 0 ? _a : (globalThis.__users = new Map());
function register(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = exports.userSchema.parse(credentials);
        if (users.has(email)) {
            throw new Error('user already exists');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const id = Math.random().toString(36).substring(2, 11);
        users.set(email, {
            email,
            password: hashedPassword,
            id,
        });
        const token = jsonwebtoken_1.default.sign({ email, id }, JWT_SECRET, { expiresIn: '24h' });
        return {
            token,
            user: {
                id,
                email,
                balance: 100000,
                portfolio: {},
            },
        };
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = exports.userSchema.parse(credentials);
        const user = users.get(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid Credentials');
        }
        const token = jsonwebtoken_1.default.sign({
            email,
            id: user.id
        }, JWT_SECRET, {
            expiresIn: '24h'
        });
        return {
            token,
            user: {
                id: user.id,
                email,
                balance: 100000,
                portfolio: {},
            },
        };
    });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (_a) {
        throw new Error('Invalid token');
    }
}
