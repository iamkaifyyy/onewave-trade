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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../lib/auth");
const router = (0, express_1.Router)();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, auth_1.register)(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong',
        });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, auth_1.login)(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong',
        });
    }
}));
exports.default = router;
