import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";

interface ClientRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

interface ClientResponse {
  id: string;
  name: string;
  email: string;
}
export default class CreateClientService {
  async execute({ name, cpf, email, password }: ClientRequest): Promise<ClientResponse>{
    if (!name || !cpf || !email || !password) throw new Error("Missing fields");

    const userEmailAlreadyExists = await prismaClient.client.findFirst({
      where: {
        email
      }
    });

    const userCPFAlreadyExists = await prismaClient.client.findFirst({
      where: {
        cpf
      }
    });

    if(userCPFAlreadyExists || userEmailAlreadyExists) throw new Error("Client already exists");

    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.client.create({
      data: {
        name,
        cpf,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return user;
  }
}
