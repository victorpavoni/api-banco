import { Response, Request } from "express";
import TransferTransactionService from "../services/TransferTransactionService";

class TransferTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const account_id = req.query.account_id as string;
    const recipient_id = req.query.recipient_id as string;
    const { amount } = req.body;

    if (!account_id) throw new Error("Missing account id");
    if (!recipient_id) throw new Error("Missing recipient id");
    if (!amount) throw new Error("Missing amount");

    const transferTransactionService = new TransferTransactionService();
    const transactions = await transferTransactionService.execute({
      account_id,
      recipient_id,
      amount,
    });

    return res.json(transactions);
  }
}

export default new TransferTransactionController();
