import { Router } from "express";

import isAuthenticated from "../../clients/middlewares/isAuthenticated";

import ListTransactionController from "../controllers/ListTransactionController";
import TransferTransactionController from "../controllers/TransferTransactionController";
import DepositTransactionController from "../controllers/DepositTransactionController";
import WithdrawTransactionController from "../controllers/WithdrawTransactionController";

const transactionRoutes = Router();

transactionRoutes.get(
  "/accounts/transactions",
  isAuthenticated,
  ListTransactionController.handle
);

transactionRoutes.post(
  "/accounts/transfer",
  isAuthenticated,
  TransferTransactionController.handle
);

transactionRoutes.post(
  "/accounts/deposit",
  isAuthenticated,
  DepositTransactionController.handle
);

transactionRoutes.delete(
  "/accounts/withdraw",
  isAuthenticated,
  WithdrawTransactionController.handle
);

export default transactionRoutes;
