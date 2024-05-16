import { Router } from "express";
import CreateClientController from "../controllers/CreateClientController";
import AuthClientController from "../controllers/AuthClientController";

import isAuthenticated from "../middlewares/isAuthenticated";

const clientRoutes = Router();

clientRoutes.post('/clients/create', CreateClientController.handle);
clientRoutes.post('/clients/login', isAuthenticated, AuthClientController.handle);

export default clientRoutes;
