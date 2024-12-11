import patientData from '../../data/patients';
import { Gender, Patient,  PatientDisplay, NewPatientEntry, AddPatientOptions } from '../types';
import { v4 as uuidv4 } from 'uuid';


const getPatients = (): PatientDisplay[] => {
    return patientData.map(({ ssn: _ssn, gender, ...rest }) => ({
        ...rest,
        gender: gender as Gender,
    }));
};

const addPatients = (newPatientData: AddPatientOptions): NewPatientEntry => {
    const newPatient: Patient = {
        id: uuidv4(),
        ...newPatientData,
    };
    patientData.push(newPatient);

    return newPatient;
};

export default { getPatients, addPatients };
