import { Router } from "express";
import DetailAccountController from "../controllers/DetailAccountController";
import CreateAccountController from "../controllers/CreateAccountController";
import isAuthenticated from "../../clients/middlewares/isAuthenticated";
import ListAccountController from "../controllers/ListAccountController";

const accountRoutes = Router();

accountRoutes.get(
  "/accounts/detail",
  isAuthenticated,
  DetailAccountController.handle
);
accountRoutes.post(
  "/accounts/create",
  isAuthenticated,
  CreateAccountController.handle
);
accountRoutes.get(
  "/accounts/list",
  isAuthenticated,
  ListAccountController.handle
);

export default accountRoutes;
