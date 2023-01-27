import express from "express";
import { body } from "express-validator";
import favController from "../controllers/fav.controller.js";
import userController from "../controllers/user.controller.js";
import reqHandler from "../handlers/req.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const router = express.Router();

router.post(
    "/signup",
    body("username").isLength({ min: 3 }).withMessage(
        "Username minimum: 3 characters"
    ).custom(async (value) => {
        const user = await userModel.findOne({ username: value });
        if (user) {
            Promise.reject("Username already in use");
        }
    }),
    body("password").isLength({ min: 6 }).withMessage(
        "Password minimum: 6 characters"
    ),
    body("confirmPassword").isLength({ min: 6 }).withMessage(
        "Password minimum: 6 characters"
    ).custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password not a match")
        }
        return true;
    }),
    body("displayname").isLength({ min: 3 }).withMessage(
        "Display name minimum: 3 characters"
    ),
    requestHandler.validate,
    userController.signup
);

router.put(
    "/update-password",
    tokenMiddleware.auth
)

export default router;