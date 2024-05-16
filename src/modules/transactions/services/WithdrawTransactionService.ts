import prismaClient from "../../../prisma";

interface WithdrawRequest {
  account_id: string;
  amount: string;
}

export default class WithdrawTransactionService {
  async execute({ account_id, amount }: WithdrawRequest): Promise<void> {
    const account = await prismaClient.account.findFirst({
      where: { id: account_id },
    });

    let accountBalance = Number(account.balance);

    if (accountBalance < Number(amount)) {
      throw new Error("Insufficient funds");
    }

    accountBalance = accountBalance - Number(amount);

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

    amount = `-${amount}`;

    await prismaClient.transaction.create({
      data: {
        account_id,
        recipient_id: "",
        type: "saque",
        amount,
      },
    });
  }
}
