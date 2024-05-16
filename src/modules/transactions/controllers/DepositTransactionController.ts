import { Response, Request } from "express";
import DepositTransactionService from "../services/DepositTransactionService";

class DepositTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const account_id = req.query.account_id as string;
    const { amount } = req.body;

    if (!account_id) throw new Error("Missing account id");
    if (!amount) throw new Error("Missing amount");

    const depositTransactionService = new DepositTransactionService();
    const transactions = await depositTransactionService.execute({
      account_id,
      amount,
    });

    return res.json(transactions);
  }
}

export default new DepositTransactionController();
