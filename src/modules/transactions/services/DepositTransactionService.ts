import prismaClient from "../../../prisma";

interface DepositRequest {
  account_id: string;
  amount: string;
}

export default class DepositTransactionService {
  async execute({ account_id, amount }: DepositRequest) {
    const account = await prismaClient.account.findFirst({
      where: { id: account_id },
    });

    let accountBalance = Number(account.balance);
    accountBalance = accountBalance + Number(amount);

    const finalAccountBalance = accountBalance.toString();

    //updateAccountBalanceDeposit
    await prismaClient.account.update({
      where: {
        id: account_id,
      },
      data: {
        balance: finalAccountBalance,
      },
    });

    await prismaClient.transaction.create({
      data: {
        account_id,
        recipient_id: "",
        type: "depósito",
        amount,
      },
    });
  }
}
