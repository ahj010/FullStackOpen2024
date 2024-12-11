import {Gender} from "./types";
import {z} from "zod";


export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
});
