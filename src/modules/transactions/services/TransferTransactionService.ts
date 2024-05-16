import prismaClient from "../../../prisma";

interface TransferRequest {
  account_id: string;
  recipient_id: string;
  amount: string;
}

export default class TransferTransactionService {
  async execute({
    account_id,
    recipient_id,
    amount,
  }: TransferRequest): Promise<void> {
    // puxa conta do usuario do banco
    const account = await prismaClient.account.findFirst({
      where: { id: account_id },
    });

    // calcula a transacao
    let accountBalance = Number(account.balance);
    accountBalance = accountBalance + Number(amount);

    const finalAccountBalance = accountBalance.toString();

    //updateAccountBalanceAdd
    await prismaClient.account.update({
      where: {
        id: account_id,
      },
      data: {
        balance: finalAccountBalance,
      },
    });

    const recipient = await prismaClient.account.findFirst({
      where: { id: recipient_id },
    });

    let recipientAccountBalance = Number(recipient.balance);

    if (recipientAccountBalance < Number(amount)) {
      throw new Error("Insufficient funds");
    }
    recipientAccountBalance = recipientAccountBalance - Number(amount);

    const finalRecipientAccountBalance = recipientAccountBalance.toString();

    //updateAccountRecipient
    await prismaClient.account.update({
      where: {
        id: recipient_id,
      },
      data: {
        balance: finalRecipientAccountBalance,
      },
    });

    await prismaClient.transaction.create({
      data: {
        account_id,
        recipient_id,
        type: "transferência",
        amount,
      },
    });

    const recipientAmount = `-${amount}`;

    await prismaClient.transaction.create({
      data: {
        account_id: recipient_id,
        recipient_id: account_id,
        type: "transferência",
        amount: recipientAmount,
      },
    });
  }
}
