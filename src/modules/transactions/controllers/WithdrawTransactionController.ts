import { Response, Request } from "express";
import WithdrawTransactionService from "../services/WithdrawTransactionService";

class WithdrawTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const account_id = req.query.account_id as string;
    const { amount } = req.body;

    if (!account_id) throw new Error("Missing account id");
    if (!amount) throw new Error("Missing amount");

    const withdrawTransactionService = new WithdrawTransactionService();
    const transactions = await withdrawTransactionService.execute({
      account_id,
      amount,
    });

    return res.json(transactions);
  }
}

export default new WithdrawTransactionController();
