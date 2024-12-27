import { NextFunction, Request, Response } from "express";
import assert from "node:assert";

const secretString = "Passkeys are cool!";

class SecretController {
    public getSecret(req: Request, res: Response, next: NextFunction) {
        assert(req.user, "User is not defined. Use authentication middleware to protect this route.");
        res.json({ secret: secretString });
    }
}

export default new SecretController();
