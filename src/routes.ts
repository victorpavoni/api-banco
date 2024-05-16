import { Router } from "express";

import clientRoutes from "./modules/clients/routes/clients.routes";
import accountRoutes from "./modules/accounts/routes/accounts.routes";
import transactionRoutes from "./modules/transactions/routes/transactions.routes";

const router = Router();

router.use(clientRoutes);
router.use(accountRoutes);
router.use(transactionRoutes);

export default router;
