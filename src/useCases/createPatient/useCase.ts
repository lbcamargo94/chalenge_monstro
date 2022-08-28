import { HasPatientByCpf, CreatePatientRepository } from './repositories';
import { Patient } from '@/entities/patient';
import { CpfAlreadyTakenError } from './errors';

type Params = {
  input: Input;
  hasPatientByCpf: HasPatientByCpf;
  createPatientRepository: CreatePatientRepository;
};
export type Input = { 
  email: Patient['email'];
  fullName: Patient['fullName'];
  phone: Patient['phone'];
  cpf: Patient['cpf'];
};
type Output = Promise<Patient>;

export const createPatientUseCase = async ({
  input,
  hasPatientByCpf,
  createPatientRepository,
}: Params): Output => {
  if (hasPatientByCpf(input.cpf)) {
    throw new CpfAlreadyTakenError(input.email);
  }
  const patient = await createPatientRepository(input);
  return patient;
};