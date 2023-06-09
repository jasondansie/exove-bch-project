"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name must be provided"],
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    surName: {
        type: String,
        required: [true, "last name must be provided"],
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: [true, "email must be provided"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password must be provided"],
        minlength: 6,
    },
    personal: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    about: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    work: {
        reportsTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    title: {
        type: String,
    },
    department: {
        type: String,
    },
    site: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    role: {
        type: String,
        enum: {
            values: ["employee", "hr", "manager"],
            message: `{VALUE} is not supported`,
        },
    },
    image: {
        type: String,
    },
});
UserSchema.virtual("displayName").get(function () {
    return `${this.firstName} ${this.surName}`;
});
UserSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcryptjs_1.default.compare(candidatePassword, this.password);
    return isMatch;
};
const User = mongoose.model("User", UserSchema);
exports.default = User;
