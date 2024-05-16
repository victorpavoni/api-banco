import { Request, Response } from "express";
import ListAccountService from "../services/ListAccountService";

class ListAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const client_id = req.client_id;

    if (!client_id) throw new Error("Missing client id");

    const listAccountService = new ListAccountService();
    const response = await listAccountService.execute({ client_id });
    return res.json(response);
  }
}

export default new ListAccountController();
