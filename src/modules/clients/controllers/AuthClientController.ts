import { Request, Response } from "express";
import AuthClientService from "../services/AuthClientService";

class AuthClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email) throw new Error("Missing email");
    if (!password) throw new Error("Missing password");

    const authClientService = new AuthClientService();
    const response = await authClientService.execute({ email, password });
    return res.json(response);
  }
}

export default new AuthClientController();
