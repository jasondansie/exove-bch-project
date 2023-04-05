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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ldap = require("ldapjs");
var dotenv = require("dotenv");
dotenv.config();
var express = require('express');
var _a = require('express'), Request = _a.Request, Response = _a.Response, NextFunction = _a.NextFunction;
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
var serverUrl = 'ldap://192.168.100.36:389';
var adminDn = 'cn=admin,dc=test,dc=com';
var adminPassword = process.env.BIND_CREDENTIALS;
var searchBase = 'dc=test,dc=com';
var searchFilter = '(uid=john)';
var client = ldap.createClient({
    url: serverUrl,
});
console.log("adminpass: ", adminPassword);
var bindClient = function (client, adminDn, adminPassword) {
    return new Promise(function (resolve, reject) {
        client.bind(adminDn, adminPassword, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
var search = function (client, searchBase, searchFilter) {
    return new Promise(function (resolve, reject) {
        client.search(searchBase, {
            scope: 'sub',
            filter: searchFilter,
        }, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                res.on('searchEntry', function (entry) {
                    return new Promise(function (resolve) {
                        resolve(entry);
                    });
                });
                res.on('error', function (err) {
                    reject(err);
                });
            }
        });
    });
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                if (typeof adminPassword === "undefined") {
                    throw new Error("Admin password is not defined");
                }
                return [4 /*yield*/, bindClient(client, adminDn, adminPassword)];
            case 1:
                _a.sent();
                return [4 /*yield*/, search(client, searchBase, searchFilter)];
            case 2:
                result = _a.sent();
                console.log(result);
                return [3 /*break*/, 5];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 5];
            case 4:
                client.unbind();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); })();
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
