import { Response, Request } from "express";
import ListTransactionService from "../services/ListTransactionService";

class ListTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const account_id = req.query.account_id as string;

    if (!account_id) throw new Error("Missing account id");

    const listTransactionService = new ListTransactionService();
    const transactions = await listTransactionService.execute({ account_id });

    return res.json(transactions);
  }
}

export default new ListTransactionController();
