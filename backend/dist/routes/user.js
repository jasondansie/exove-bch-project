"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = require("../controllers/user");
router.route("/auth/login").post(user_1.login);
router.route("/auth/register").post(user_1.register);
router.route("/").get(user_1.getAllUsers);
router.route("/:id").get(user_1.getOneUser).delete(user_1.deleteUser).patch(user_1.updateUser);
exports.default = router;
