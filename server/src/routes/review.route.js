import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middleware/token.middleware.js";
import reqHandler from "../handlers/req.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getUserReviews
);

router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
        .exists().withMessage("MediaId is required")
        .isLength({ min: 1 }).withMessage("Media Id can not be empty"),
    body("content")
        .exists().withMessage("Content is required")
        .isLength({ min: 1 }).withMessage("Content can not be empty"),
    body("mediaType")
        .exists().withMessage("Media type is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage(
            "Media type invalid"
        ),
    body("mediaTitle")
        .exists().withMessage("Media type is required"),
    body("mediaPoster")
        .exists().withMessage("Media poster is required"),
    reqHandler.validate,
    reviewController.createReview
);

router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.removeReview
);

export default router;