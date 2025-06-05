"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.deleteUnmarge = exports.getUnmarge = exports.updateUnsyncs = exports.getUnsyncs = exports.testDbsync = void 0;
const tryCatch_1 = require("../../../utilities/tryCatch");
const sendRes_1 = require("../../../utilities/sendRes");
const http_status_1 = __importDefault(require("http-status"));
const dbsync_services_1 = require("./dbsync.services");
// Test database connection
exports.testDbsync = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dbsync_services_1.testDbsyncService)();
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Create dbsync successfully',
        data: result,
    });
}));
// Get unsyncs controller
exports.getUnsyncs = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, dbsync_services_1.getDbUnsyncsService)((_a = req === null || req === void 0 ? void 0 : req.route) === null || _a === void 0 ? void 0 : _a.path.slice(1), req === null || req === void 0 ? void 0 : req.query);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Dbsyncs retrived successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// Update unsyncs controller
exports.updateUnsyncs = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, dbsync_services_1.updateUnsyncsService)((_a = req === null || req === void 0 ? void 0 : req.route) === null || _a === void 0 ? void 0 : _a.path.slice(1), req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Database syncs successfully',
        data: result,
    });
}));
// Get unmarge controller
exports.getUnmarge = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dbsync_services_1.getUnmargeService)(req === null || req === void 0 ? void 0 : req.query);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Unmarged retrived successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// Delete unmarge controller
exports.deleteUnmarge = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dbsync_services_1.deleteUnmargeService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Unmarged retrived successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
