import { Account } from "@prisma/client";
import prismaClient from "../../../prisma";

interface DetailAccountProps {
  id: string;
}

export default class DetailAccountService {
  async execute({ id }: DetailAccountProps): Promise<Account> {
    const account = await prismaClient.account.findFirst({
      where: {
        id,
      },
    });

    return account;
  }
}
