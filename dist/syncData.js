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
exports.syncData = syncData;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
const asyncForEach_1 = require("./utilities/asyncForEach");
const bootStrap_1 = require("./utilities/bootStrap");
const logger_1 = require("./utilities/logger");
const prisma_1 = require("./utilities/prisma");
function syncData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, bootStrap_1.connectDatabases)();
            console.log('✅ All databases connected successfully');
            try {
                // Get unsynced invoices from the local database
                const unsyncedData = yield prisma_1.localPrisma.user.findMany({
                    where: { isSynced: false },
                });
                if (unsyncedData.length > 0) {
                    yield (0, asyncForEach_1.asyncForEach)(unsyncedData, (data) => __awaiter(this, void 0, void 0, function* () {
                        const result = yield prisma_1.remotePrisma.user.create({ data: data });
                        // Mark as synced in the local database
                        if (result) {
                            yield prisma_1.localPrisma.user.update({
                                where: { id: data === null || data === void 0 ? void 0 : data.id },
                                data: { isSynced: true },
                            });
                        }
                    }));
                }
                else {
                    console.log(`No new entry`);
                }
            }
            catch (error) {
                logger_1.errorLogger.error('Error syncing data:', error);
            }
        }
        catch (err) {
            console.error('❌ Error during database connection:', err);
        }
    });
}
