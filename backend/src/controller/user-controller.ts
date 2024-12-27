import { NextFunction, Request, Response } from "express";
import { getUser, insertUser, updateUserCity } from "../db/queries.js";
import assert from "node:assert";
import { getUserIdentifiers } from "../utils/authentication.js";

class UserController {
    public async updateCity(req: Request, res: Response, next: NextFunction) {
        assert(
            req.user,
            "User is not defined. Use authentication middleware to protect this route.",
        );
        const city = req.body.city;
        await updateUserCity(req.user!.userId, city);
        const updatedUser = getUser(req.user.userId);
        if (!updatedUser) {
            res.status(200).send();
            return;
        }
        res.json(updatedUser);
    }

    public async infoGet(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        assert(
            user,
            "User is not defined. Use authentication middleware to protect this route.",
        );
        let dbUser = getUser(user.userId);
        // if the user has not logged in before (i.e. getUser returns undefined),
        // we insert the user into the database
        dbUser ??= await insertUser(user.userId);
        // get the users identifiers via the Corbado Node.js SDK
        const userIdentifiers = await getUserIdentifiers(user.userId);
        // return all user info
        res.json({ user: dbUser, identifiers: userIdentifiers.identifiers });
    }
}

export default new UserController();
