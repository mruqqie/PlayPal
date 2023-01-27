import resHandler from "../handlers/res.handler.js";
import reviewModel from "../models/review.model.js";

const createReview = async (req, res) => {
    try {
        const { movieId } = req.params;

        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body
        });

        await review.save();

        resHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        });
    } catch {
        resHandler.error(res);
    }
};

const removeReview = async (req, res) => {
    try {
        const {  reviewId } = req.params;
        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        });

        if (!review) {
            return resHandler.notFound(res);
        };

        await review.remove();

        resHandler.ok(res);
    } catch {
        resHandler.error(res);
    }
};

const getUserReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({
            user: req.user.id,
        }).sort("-createdAt");

        resHandler.ok(res, review);
    } catch {
        resHandler.error(res);
    }
};

export default {
    createReview,
    removeReview,
    getUserReviews
};