import { Account } from "@prisma/client";
import prismaClient from "../../../prisma";

interface ListAccountProps {
  client_id: string;
}

export default class ListAccountService {
  async execute({ client_id }: ListAccountProps): Promise<Account[]> {
    const account = await prismaClient.account.findMany({
      where: { client_id },
    });

    return account;
  }
}
