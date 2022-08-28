import { Patient } from "@/entities/patient";
import { Input } from "./useCase";

export type CreatePatientRepository = (input: Input) => Patient;

export type HasPatientByCpf = (cpf: Patient['cpf']) => Boolean;