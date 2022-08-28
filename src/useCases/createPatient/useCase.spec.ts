import { CpfAlreadyTakenError } from "./errors";
import { CreatePatientRepository, HasPatientByCpf } from "./repositories";
import { createPatientUseCase } from "./useCase";

describe("createPatientUseCase", () => {
  let hasPatientByCpf: HasPatientByCpf;
  let createPatientRepository: CreatePatientRepository;
  let sut: typeof createPatientUseCase;

  beforeEach(() => {
    hasPatientByCpf = jest.fn();
    createPatientRepository = jest.fn();
    sut = createPatientUseCase;
  });

  it("should throw CpfAlreadyTakenError when CPF already taken", async () => {
    // @ts-ignore
    hasPatientByCpf.mockImplementationOnce(() => true);
    expect(() =>
      sut({
        input: {
          email: "",
          phone: "",
          fullName: "",
          cpf: "",
        },
        hasPatientByCpf,
        createPatientRepository,
      })
    ).rejects.toThrow(CpfAlreadyTakenError);
  });

  it("should create a new Patient", async () => {
    const mockPatient = {
      id: "1",
      email: "test@test.com",
      phone: "123456789123",
      fullName: "Test",
      cpf: "421.421.421-45",
    };
    // @ts-ignore
    hasPatientByCpf.mockImplementationOnce(() => false);
    // @ts-ignore
    createPatientRepository.mockImplementationOnce(() => mockPatient);
    expect(
      await sut({
        input: {
          email: "",
          phone: "",
          fullName: "",
          cpf: "",
        },
        hasPatientByCpf,
        createPatientRepository,
      })
    ).toStrictEqual(mockPatient);
  });
});
