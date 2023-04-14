"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var user_1 = require("../controllers/user");
var authentication_1 = require("../middleware/authentication");
router.route("/auth/login").post(user_1.ldapLogin);
router.route("/user").get(authentication_1.default, user_1.getAllUsers);
router.route("/user/:id").get(authentication_1.default, user_1.getOneUser);
exports.default = router;
