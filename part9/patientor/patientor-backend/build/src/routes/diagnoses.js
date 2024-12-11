"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnose_1 = __importDefault(require("../services/diagnose"));
const diagnosesRouter = express_1.default.Router();
diagnosesRouter.get('/', (_req, res) => {
    const diagnoses = diagnose_1.default.getDiagnoses();
    res.send(diagnoses);
});
exports.default = diagnosesRouter;
