import * as mongoose from "mongoose";
import { Model } from "mongoose";
import {
  ISurveypack,
  SurveyPackStatus,
  SurveyorsAcceptance,
} from "../types/dataTypes";

type SurveyPackType = ISurveypack & mongoose.Document;

const SurveyorSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  acceptanceStatus: {
    type: String,
    enum: Object.values(SurveyorsAcceptance),
    default: "Pending",
  },
  isSurveyComplete: {
    type: Boolean,
    default: false,
  },
});

const SurveyPackSchema = new mongoose.Schema(
  {
    personBeingSurveyed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Please select the employee to survey"],
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "survey",
      required: [true, "Please select the survey"],
    },
    employeesTakingSurvey: {
      type: [SurveyorSchema],
      validate: [
        {
          validator: function (val: any) {
            return val.length <= 6;
          },
          message: "The maximum number of employees allowed is 6",
        },
      ],
      required: [true, "Please include the employees"],
    },
    deadline: {
      type: Date,
      required: [true, "Please add deadline"],
      default: Date.now(),
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(SurveyPackStatus),
      default: "Open",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Please add the manager"],
      default: "",
    },
    managerapproved: {
      type: Boolean,
      default: false,
    },
    hrapproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SurveyPack: Model<SurveyPackType> = mongoose.model<SurveyPackType>(
  "SurveyPack",
  SurveyPackSchema
);

export default SurveyPack;