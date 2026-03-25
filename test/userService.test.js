const UserService = require("../src/userService");

describe("UserService", () => {

  test("deve retornar o nome do usuário quando encontrado", async () => {
    const mockRepository = {
      findById: jest.fn().mockResolvedValue({ id: 1, name: "Alex" })
    };

    const service = new UserService(mockRepository);

    const result = await service.getUserName(1);

    expect(result).toBe("Alex");
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
  });

  test("deve lançar erro quando usuário não for encontrado", async () => {
    const mockRepository = {
      findById: jest.fn().mockResolvedValue(null)
    };

    const service = new UserService(mockRepository);

    await expect(service.getUserName(1))
      .rejects
      .toThrow("Usuário não encontrado");
  });

  test("deve chamar o repository apenas uma vez", async () => {
    const mockRepository = {
      findById: jest.fn().mockResolvedValue({ id: 1, name: "Alex" })
    };

    const service = new UserService(mockRepository);

    await service.getUserName(1);

    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
  });

});