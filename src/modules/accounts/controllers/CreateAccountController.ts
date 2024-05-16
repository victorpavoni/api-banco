import { Request, Response } from "express";
import CreateAccountService from "../services/CreateAccountService";

class CreateAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const client_id = req.client_id as string;

    if (!client_id) throw new Error("Client id not provided");

    const createAccountService = new CreateAccountService();
    const response = await createAccountService.execute({ client_id });
    return res.json(response);
  }
}

export default new CreateAccountController();
