import { Patient } from "@/entities/patient";

export class CpfAlreadyTakenError extends Error {
  constructor(cpf: Patient['cpf']) {
    super(`CPF "${cpf}" already taken`);
    this.name = 'CpfAlreadyTakenError';
  }
}
