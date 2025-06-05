"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import reqValidate from '../../../middleware/reqValidate'
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
// import { createDbsyncZod } from './dbsync.validations'
const dbsync_controllers_1 = require("./dbsync.controllers");
const router = express_1.default.Router();
// example dbsync route
router.route('/').get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), dbsync_controllers_1.testDbsync);
router
    .route('/unSyncLtoR')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), dbsync_controllers_1.getUnsyncs)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), dbsync_controllers_1.updateUnsyncs);
router
    .route('/unSyncRtoL')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), dbsync_controllers_1.getUnsyncs)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), dbsync_controllers_1.updateUnsyncs);
router
    .route('/unmarge')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), dbsync_controllers_1.getUnmarge)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), dbsync_controllers_1.deleteUnmarge);
exports.default = router;
