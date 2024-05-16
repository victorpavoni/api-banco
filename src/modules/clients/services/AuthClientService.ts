import prismaClient from "../../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthClientRequest {
  email: string;
  password: string;
}

interface AuthResponseProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
  token: string;
}

export default class AuthClientService {
  async execute({
    email,
    password,
  }: AuthClientRequest): Promise<AuthResponseProps> {
    if (!email || !password) throw new Error("Missing fields");

    const client = await prismaClient.client.findFirst({
      where: {
        email,
      },
    });

    if (!client) throw new Error("Email/password incorrect");

    const comparePassword = await compare(password, client.password);

    if (!comparePassword) throw new Error("Email/password incorrect");

    const token = sign(
      {
        id: client.id,
        email: client.email,
      },
      process.env.JWT_SECRET,
      {
        subject: client.id,
        expiresIn: "30d",
      }
    );

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      token,
    };
  }
}
