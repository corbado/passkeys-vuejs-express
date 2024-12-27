// This file contains all secret routes

import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import secretController from "../controller/secret-controller.js";

const router = Router();

router.get("/", requireAuth, secretController.getSecret);

export default router;
