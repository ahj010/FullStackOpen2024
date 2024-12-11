import {z} from 'zod';
import { newEntrySchema } from './utils';

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export enum Gender{
    Male= "male",
    Female= "female",
    Other= "other"
}

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export interface AddPatientOptions {
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
  }

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export type PatientDisplay = Omit<Patient, 'ssn' | 'id'>;
