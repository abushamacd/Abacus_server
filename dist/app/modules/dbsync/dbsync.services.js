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
exports.deleteUnmargeService = exports.getUnmargeService = exports.updateUnsyncsService = exports.getDbUnsyncsService = exports.testDbsyncService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("../../../errorFormating/apiError");
const asyncForEach_1 = require("../../../utilities/asyncForEach");
const bootStrap_1 = require("../../../utilities/bootStrap");
const prisma_1 = require("../../../utilities/prisma");
// Test database connection service
const testDbsyncService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, bootStrap_1.connectDatabases)();
    return result;
});
exports.testDbsyncService = testDbsyncService;
// Get unsyncs Service
const getDbUnsyncsService = (path, schemaName) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data from local
    if (path === 'unSyncLtoR') {
        // @ts-ignore
        const unsyncedData = yield prisma_1.localPrisma[schemaName === null || schemaName === void 0 ? void 0 : schemaName.schemaName].findMany({
            where: { isSynced: false },
        });
        return {
            meta: {
                total: unsyncedData.length,
                page: 0,
                limit: 0,
            },
            data: unsyncedData,
        };
    }
    // Get data from remote
    if (path === 'unSyncRtoL') {
        // @ts-ignore
        const unsyncedData = yield prisma_1.remotePrisma[schemaName === null || schemaName === void 0 ? void 0 : schemaName.schemaName].findMany({
            where: { isSynced: false },
        });
        return {
            meta: {
                total: unsyncedData.length,
                page: 0,
                limit: 0,
            },
            data: unsyncedData,
        };
    }
    return null;
});
exports.getDbUnsyncsService = getDbUnsyncsService;
// Update unsyncs service
const updateUnsyncsService = (path, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { data } = payload;
    // Local to Remote
    if (path === 'unSyncLtoR') {
        const result = yield (0, asyncForEach_1.asyncForEach)(data, (singleData) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield prisma_1.remotePrisma.$transaction((remoteTx) => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const find = yield remoteTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].findFirst({
                    where: {
                        id: singleData === null || singleData === void 0 ? void 0 : singleData.id,
                    },
                });
                // If data exist on remote database run if condition, if not exist run else condition
                if (find !== null) {
                    // @ts-ignore
                    const result = yield remoteTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].update({
                        where: { id: find === null || find === void 0 ? void 0 : find.id },
                        data: singleData,
                    });
                    if (result == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not updated on remote data');
                    }
                    const update = yield prisma_1.localPrisma.$transaction((localTx) => __awaiter(void 0, void 0, void 0, function* () {
                        // @ts-ignore
                        const update = yield localTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].update({
                            where: { id: result === null || result === void 0 ? void 0 : result.id },
                            data: { isSynced: true },
                        });
                        return update;
                    }));
                    if (update == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not updated on local data');
                    }
                    return update;
                }
                else {
                    // @ts-ignore
                    const result = yield remoteTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].create({
                        data: singleData,
                    });
                    if (result == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not create on remote data');
                    }
                    const update = yield prisma_1.localPrisma.$transaction((localTx) => __awaiter(void 0, void 0, void 0, function* () {
                        // @ts-ignore
                        const update = yield localTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].update({
                            where: { id: result === null || result === void 0 ? void 0 : result.id },
                            data: { isSynced: true },
                        });
                        return update;
                    }));
                    if (update == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not updated on local data');
                    }
                    return update;
                }
            }));
            return result;
        }));
        return result;
    }
    // Remote to Local
    if (path === 'unSyncRtoL') {
        const result = yield (0, asyncForEach_1.asyncForEach)(data, (singleData) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield prisma_1.localPrisma.$transaction((localTx) => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const find = yield localTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].findFirst({
                    where: {
                        id: singleData === null || singleData === void 0 ? void 0 : singleData.id,
                    },
                });
                if (find !== null) {
                    // @ts-ignore
                    const result = yield localTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].update({
                        where: { id: find === null || find === void 0 ? void 0 : find.id },
                        data: singleData,
                    });
                    if (result == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not updated on local data');
                    }
                    const update = yield prisma_1.remotePrisma.$transaction((remoteTx) => __awaiter(void 0, void 0, void 0, function* () {
                        // @ts-ignore
                        const update = yield remoteTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].update({
                            where: { id: result === null || result === void 0 ? void 0 : result.id },
                            data: { isSynced: true },
                        });
                        return update;
                    }));
                    if (update == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not updated on remote data');
                    }
                    return update;
                }
                else {
                    // @ts-ignore
                    const result = yield localTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].create({
                        data: singleData,
                    });
                    if (result == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not create on local data');
                    }
                    const update = yield prisma_1.remotePrisma.$transaction((remoteTx) => __awaiter(void 0, void 0, void 0, function* () {
                        // @ts-ignore
                        const update = yield remoteTx[payload === null || payload === void 0 ? void 0 : payload.schemaName].update({
                            where: { id: result === null || result === void 0 ? void 0 : result.id },
                            data: { isSynced: true },
                        });
                        return update;
                    }));
                    if (update == null) {
                        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Data not updated on remote data');
                    }
                    return update;
                }
            }));
            return result;
        }));
        return result;
    }
    return null;
});
exports.updateUnsyncsService = updateUnsyncsService;
// Get unmarge service
const getUnmargeService = (schemaName) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const localData = yield prisma_1.localPrisma[schemaName === null || schemaName === void 0 ? void 0 : schemaName.schemaName].findMany({});
    // @ts-ignore
    const remoteData = yield prisma_1.remotePrisma[schemaName === null || schemaName === void 0 ? void 0 : schemaName.schemaName].findMany({});
    const localIds = new Set(localData.map((item) => item.id));
    const unMargeData = remoteData.filter((item) => !localIds.has(item.id));
    // .map((item: any) => item.id)
    return {
        meta: {
            total: unMargeData.length,
            page: 0,
            limit: 0,
        },
        data: unMargeData,
    };
});
exports.getUnmargeService = getUnmargeService;
// Delete unmarge service
const deleteUnmargeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const result = yield prisma_1.remotePrisma[payload === null || payload === void 0 ? void 0 : payload.schemaName].deleteMany({
        where: {
            id: {
                in: payload === null || payload === void 0 ? void 0 : payload.data,
            },
        },
    });
    return result;
});
exports.deleteUnmargeService = deleteUnmargeService;
