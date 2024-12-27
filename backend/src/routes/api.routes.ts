// This file contains all api routes

import { Router } from "express";
import secretRoutes from "./secret.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

// Health check route
router.get("/", (req, res) => {
    res.json({
        message: "API is running",
        timestamp: new Date().toISOString(),
    });
});
router.use("/user", userRoutes);
router.use("/secret", secretRoutes);

export default router;
