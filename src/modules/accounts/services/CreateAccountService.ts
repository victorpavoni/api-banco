import { Account } from "@prisma/client";
import prismaClient from "../../../prisma";

interface CreateAccountProps {
  client_id: string;
}

export default class CreateAccountService {
  async execute({ client_id }: CreateAccountProps): Promise<Account> {
    const account = await prismaClient.account.create({
      data: {
        client_id: client_id,
      },
    });

    return account;
  }
}
