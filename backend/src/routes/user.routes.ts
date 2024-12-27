import { requireAuth } from "../middleware/auth.js";
import profileController from "../controller/user-controller.js";
import { Router } from "express";

const router = Router();

router.get("/", requireAuth, profileController.infoGet);
router.post("/city", requireAuth, profileController.updateCity);

export default router;
