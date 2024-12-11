import express, {Request, Response, NextFunction} from 'express';
import patientService from '../services/patient';
import {newEntrySchema} from '../utils';
import {z} from 'zod';
import { NewPatientEntry } from '../types';
const app = express();
app.use(express.json());


const PatientsRouter = express.Router();

PatientsRouter.get('/' , (_req, res) => {
    const patients = patientService.getPatients();
     res.json(patients);
});


const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues[0].message });
  } else {
    next(error);
  }
};

PatientsRouter.post('/' , newEntryParser, (req : Request<unknown , unknown , NewPatientEntry>, res: Response<NewPatientEntry>) => {
    const newPatient = patientService.addPatients(req.body);
    res.json(newPatient);

});

PatientsRouter.use(errorMiddleware);

export default PatientsRouter;
