import resHandler from "../handlers/res.handler";
import favModel from "../models/fav.model";

const addFav = async (req, res) => {
    try {
        const isFav = await favModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        })

        if (isFav) {
            return resHandler.ok(res, isFav)
        }

        const fav = new favModel({
            ...req.body,
            user: req.user.id
        });

        await fav.save();

        resHandler.created(res, fav);
    } catch {
        resHandler.error(res);
    }
};

const removeFav =  async (req, res) => {
    try {
        const { favId } = req.params;

        const fav = await favModel.findOne({
            user: req.user.id,
            _id: favId
        })

        if (!fav) {
            return resHandler.notFound(res)
        }

        await fav.remove();

        resHandler.ok(res);
    } catch {
        resHandler.error(res);
    }
};

const getUserFavs = async (req, res) => {
    try {
        const fav = await favModel.find({
            user: req.user.id
        }).sort("-createdAt");

        resHandler.ok(res, fav);
    } catch {
        resHandler.error(res);
    }
};

export default {
    addFav,
    removeFav,
    getUserFavs
};