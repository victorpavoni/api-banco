import { Request, Response } from "express";
import DetailAccountService from "../services/DetailAccountService";

class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.query.account_id as string;

    if (!id) throw new Error("Id not provided");

    const detailAccountService = new DetailAccountService();
    const response = await detailAccountService.execute({ id });
    return res.json(response);
  }
}

export default new CreateClientController();
