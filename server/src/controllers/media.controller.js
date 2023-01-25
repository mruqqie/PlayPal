import resHandler from "../handlers/res.handler";
import tmdbApi from "../tmdb/tmdb.api";
import userModel from "../models/user.model";
import favModel from "../models/fav.model";
import reviewModel from "../models/review.model";

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
        const response = await tmdbApi.mediaGenre({ mediaType })

        return resHandler.ok(res, response);
    } catch {
        resHandler.error(res);
    }
};

const search = async (req, res) => {
    try {
        
    } catch {
        resHandler.error(res);
    }
};