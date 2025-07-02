"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const user_controllers_1 = require("./user.controllers");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const router = express_1.default.Router();
// get all user
router
    .route('/')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), user_controllers_1.getUsers);
// get & update my profile
router
    .route('/profile')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER, user_1.ENUM_USER_ROLE.RETAILER, user_1.ENUM_USER_ROLE.CONSUMER), user_controllers_1.getUserProfile)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER, user_1.ENUM_USER_ROLE.RETAILER, user_1.ENUM_USER_ROLE.CONSUMER), user_controllers_1.updateUserProfile);
// change user role
router.route('/changeRole').patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), user_controllers_1.updateUserRole);
// change user access
router
    .route('/changeAccess/:id')
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), user_controllers_1.updateUserAccess);
// upload profile photo
router.route('/photo').post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER, user_1.ENUM_USER_ROLE.RETAILER, user_1.ENUM_USER_ROLE.CONSUMER), 
// @ts-ignore
FileUploadHelper_1.FileUploadHelper.upload.single('images'), user_controllers_1.uploadPhoto);
// get user
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), user_controllers_1.getUser)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), user_controllers_1.updateUser);
// delete user
router.route('/:id').delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), user_controllers_1.deleteUser);
exports.default = router;
