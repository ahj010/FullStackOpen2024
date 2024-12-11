"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_1 = __importDefault(require("../services/patient"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PatientsRouter = express_1.default.Router();
PatientsRouter.get('/', (_req, res) => {
    const patients = patient_1.default.getPatients();
    res.json(patients);
});
const newEntryParser = (req, _res, next) => {
    try {
        utils_1.newEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues[0].message });
    }
    else {
        next(error);
    }
};
PatientsRouter.post('/', newEntryParser, (req, res) => {
    const newPatient = patient_1.default.addPatients(req.body);
    res.json(newPatient);
});
PatientsRouter.use(errorMiddleware);
exports.default = PatientsRouter;
