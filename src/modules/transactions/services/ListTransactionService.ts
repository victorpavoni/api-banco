import { Transaction } from "@prisma/client";
import prismaClient from "../../../prisma";

interface ListTransactionProps {
  account_id: string;
}

export default class ListTransactionService {
  async execute({ account_id }: ListTransactionProps): Promise<Transaction[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: { account_id },
      orderBy: {
        created_at: "desc",
      },
    });

    return transactions;
  }
}
