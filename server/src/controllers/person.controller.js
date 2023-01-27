import resHandler from "../handlers/res.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;

        const person = await tmdbApi.personDetail({ personId });

        resHandler.ok(res, person);
    } catch {
        resHandler.error(res);
    }
};

const personMedias = async (req, res) => {
    try {
        const { personId } = req.params;
        const medias = await tmdbApi.personMedias({ personId });

        resHandler.ok(res, medias);
    } catch {
        resHandler.error(res);
    }
};

export default { personDetail, personMedias };