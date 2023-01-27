import resHandler from "../handlers/res.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favModel from "../models/fav.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const getList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;

        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

        return resHandler.ok(res, response);
    } catch  {
        resHandler.error(res)
    }
};

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const response = await tmdbApi.mediaGenre({ mediaType });

        return resHandler.ok(res, response);
    } catch {
        resHandler.error(res);
    }
};

const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });

        resHandler.ok(res, response);
    } catch {
        resHandler.error(res);
    }
};

const getDetail = async (req, res) => {
    try {
        const { mediaType , mediaId} = req.params;

        const params = { mediaType, mediaId };

        const media = await tmdbApi.mediaDetail(params);

        media.credits = await tmdbApi.mediaCredits(params);

        media.videos = await tmdbApi.mediaVideos(params);

        const recommend = await tmdbApi.mediaRecommend(params);
        media.recommend = recommend.results;

        media.images = await tmdbApi.mediaImages(params);

        const tokenDecoded = tokenMiddleware.tokenDecode(req)

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data)

            if (user) {
                const isFav = await favModel.findOne({
                    user: user.id,
                    mediaId
                });

                media.isFav = isFav !== null;
            };
        };

        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort
        ("-createdAt");

        resHandler.ok(res, media);
    } catch {
        resHandler.error(res);
    }
};

export default { getList, getGenres, search, getDetail };