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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectivity = void 0;
const dns_1 = __importDefault(require("dns"));
const prisma_1 = require("../utilities/prisma");
const connectivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check internet connectivity
        const internetAvailable = yield new Promise(resolve => {
            dns_1.default.resolve('google.com', err => {
                resolve(!err);
            });
        });
        if (!internetAvailable) {
            res.status(503).json({
                success: false,
                message: '❌ Internet connection unavailable. Service unavailable.',
            });
            return; // Stop further execution
        }
        // Connect to local and remote databases
        try {
            yield prisma_1.localPrisma.$connect();
            yield prisma_1.remotePrisma.$connect();
            console.log('✅ All databases connected successfully');
        }
        catch (dbError) {
            res.status(500).json({
                success: false,
                message: 'Database connection failed: ' + dbError,
            });
            return; // Stop further execution
        }
        // If everything is fine, proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred: ' + error,
        });
    }
});
exports.connectivity = connectivity;
