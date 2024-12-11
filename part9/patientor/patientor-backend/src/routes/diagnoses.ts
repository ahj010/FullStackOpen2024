import express from 'express';
import diagnoseService from '../services/diagnose';


const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    const diagnoses = diagnoseService.getDiagnoses();
    res.send(diagnoses);
});

export default diagnosesRouter;
