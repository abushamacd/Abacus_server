"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remotePrisma = exports.localPrisma = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../config"));
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
exports.localPrisma = new client_1.PrismaClient({
    datasources: {
        db: { url: config_1.default.db_url },
    },
});
exports.remotePrisma = new client_1.PrismaClient({
    datasources: {
        db: { url: config_1.default.remote_db_url }, // Your remote MySQL URL
    },
});
exports.default = prisma;
