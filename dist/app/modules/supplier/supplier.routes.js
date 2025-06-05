"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const supplier_validations_1 = require("./supplier.validations");
const supplier_controllers_1 = require("./supplier.controllers");
const router = express_1.default.Router();
// example supplier route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), (0, reqValidate_1.default)(supplier_validations_1.createSupplierZod), supplier_controllers_1.createSupplier)
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), supplier_controllers_1.getSuppliers);
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), supplier_controllers_1.getSupplier)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), supplier_controllers_1.updateSupplier)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), supplier_controllers_1.deleteSupplier);
exports.default = router;
