import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
    return diagnoseData as Diagnosis[];
};

export default { getDiagnoses };
