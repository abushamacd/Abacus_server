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
exports.getSchemaNames = getSchemaNames;
/* eslint-disable no-console */
const client_1 = require("@prisma/client");
function getSchemaNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const schemaNames = Object.keys(prisma).filter(key => typeof prisma[key] === 'object' &&
            prisma[key] !== null &&
            'findMany' in prisma[key] &&
            key !== '$on' &&
            key !== '$connect' &&
            key !== '$disconnect' &&
            key !== '$use' &&
            key !== '$transaction' &&
            key !== '$extends');
        return schemaNames;
    });
}
