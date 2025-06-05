"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const unit_validations_1 = require("./unit.validations");
const unit_controllers_1 = require("./unit.controllers");
const router = express_1.default.Router();
// example unit route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), (0, reqValidate_1.default)(unit_validations_1.createUnitZod), unit_controllers_1.createUnit)
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), unit_controllers_1.getUnits);
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), unit_controllers_1.getUnit)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), unit_controllers_1.updateUnit)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), unit_controllers_1.deleteUnit);
exports.default = router;
