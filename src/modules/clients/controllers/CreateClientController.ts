import { Request, Response } from "express";
import CreateClientService from "../services/CreateClientService";

class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, cpf, email, password } = req.body;

    if (!name) throw new Error("Missing name");
    if (!cpf) throw new Error("Missing cpf");
    if (!email) throw new Error("Missing email");
    if (!password) throw new Error("Missing password");

    const createClientService = new CreateClientService();
    const response = await createClientService.execute({
      name,
      cpf,
      email,
      password,
    });
    return res.json(response);
  }
}

export default new CreateClientController();
