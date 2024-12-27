import { Router } from "express";
import apiRoutes from "./api.routes.js";

const router = Router();

// Mount route modules
router.use("/api", apiRoutes);

export default router;
