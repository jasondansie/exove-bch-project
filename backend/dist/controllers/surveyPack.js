"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManagerApproval = exports.getManagerApproval = exports.updateSurveyors = exports.getSurveyors = exports.deleteSurveyPack = exports.updateSurveyPack = exports.getSurveyPack = exports.createSurveyPack = void 0;
const surveyPack_1 = __importDefault(require("../models/surveyPack"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const createSurveyPack = async (req, res) => {
    const surveyPack = await surveyPack_1.default.create(req.body);
    if (!surveyPack) {
        throw new errors_1.BadRequestError("Please complete the form");
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ surveyPack });
};
exports.createSurveyPack = createSurveyPack;
const getSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findOne({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getSurveyPack = getSurveyPack;
const updateSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findByIdAndUpdate({ _id: surveyPackId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "surveyPack successfully updated", surveyPack: surveyPack });
};
exports.updateSurveyPack = updateSurveyPack;
const deleteSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findByIdAndRemove({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! SurveyPack removed." });
};
exports.deleteSurveyPack = deleteSurveyPack;
const getSurveyors = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId }).populate("employeesTakingSurvey");
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    const employeesTakingSurvey = surveyPack.employeesTakingSurvey;
    return res.status(http_status_codes_1.StatusCodes.OK).json({ employeesTakingSurvey });
};
exports.getSurveyors = getSurveyors;
const updateSurveyors = async (req, res) => {
    const { params: { id: surveyPackId }, body: { employeesTakingSurvey }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    surveyPack.employeesTakingSurvey = employeesTakingSurvey;
    await surveyPack.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "EmployeesTakingSurvey updated successfully",
        employeesTakingSurvey: surveyPack.employeesTakingSurvey,
    });
};
exports.updateSurveyors = updateSurveyors;
const getManagerApproval = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId }, { employeesTakingSurvey: 1, manager: 1, managerapproved: 1 });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getManagerApproval = getManagerApproval;
const updateManagerApproval = async (req, res) => {
    const { params: { id: surveyPackId }, body: { employeesTakingSurvey, manager, managerapproved }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    surveyPack.employeesTakingSurvey = employeesTakingSurvey;
    surveyPack.manager = manager;
    surveyPack.managerapproved = managerapproved;
    await surveyPack.save();
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        msg: "manager approval successful updated",
        employeesTakingSurvey: surveyPack.employeesTakingSurvey,
        managerapproved: surveyPack.managerapproved,
        manager: surveyPack.manager,
    });
};
exports.updateManagerApproval = updateManagerApproval;
