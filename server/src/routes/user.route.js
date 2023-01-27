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
    body("username")
        .exists().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username minimum: 3 characters")
        .custom(async (value) => {
            const user = await userModel.findOne({ username: value });
            if (user) {
                Promise.reject("Username already in use");
            }
        }),
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage(
            "Password minimum: 6 characters"
        ),
    body("confirmPassword")
        .exists().withMessage("Confirm password is required")
        .isLength({ min: 6 }).withMessage("Password minimum: 6 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password not a match")
            }
            return true;
        }),
    body("displayname")
        .exists().withMessage("Display name is required")
        .isLength({ min: 3 }).withMessage(
            "Display name minimum: 3 characters"
        ),
    reqHandler.validate,
    userController.signup
);

router.post(
    "/signin",
    body("username")
        .exists().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("User minimum: 3 characters"),
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage(
            "Password minimum: 6 characters"
        ),
    reqHandler.validate,
    userController.signin
);

router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password minimum: 6 characters"),
    body("newPassword")
        .exists().withMessage("New password is required")
        .isLength({ min: 6 }).withMessage("Username minimum: 6 characters"),
    body("confirmPassword")
        .exists().withMessage("Confirm Password is required")
        .isLength({ min: 3 }).withMessage("Username minimum: 3 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password not a match")
            }
            return true;
        }),
    reqHandler.validate,
    userController.updatePassword
);

router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
);

router.get(
    "/favorites",
    tokenMiddleware.auth,
    favController.getUserFavs
);

router.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediaType")
        .exists().withMessage("Media type is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage(
            "Media type invalid"
        ),
    body("mediaId")
        .exists().withMessage("Media id is required")
        .isLength({ min: 1 }).withMessage("Media Id can not be empty"),
    body("mediaTitle")
        .exists().withMessage("Media type is required"),
    body("mediaPoster")
        .exists().withMessage("Media poster is required"),
    body("mediaRate")
        .exists().withMessage("Media rate is required"),
    favController.addFav
);

router.delete(
    "/favorites/:favoriteId",
    tokenMiddleware.auth,
    favController.removeFav
);

export default router;