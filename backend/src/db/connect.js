"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var url = process.env.MONGO_URI;
var connectDB = function (url) {
    return mongoose_1.default.connect(url);
};
exports.default = connectDB;