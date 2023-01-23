import jsonwebtoken from "jsonwebtoken";
import resHandler from "../handlers/res.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"]

        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1]

            return jsonwebtoken.verify(
                token,
                process.env.TOKEN_SECRET
            )
        }
        return false
    } catch {
        return false;
    }
};

const auth = async (res, req, next) => {
    const tokenDecoded = tokenDecode(req);

    if (!tokenDecode) {
        return resHandler.unauthorized(res)
    }

    const user = await userModel.findById(tokenDecoded.data)

    if (!user) {
        return resHandler.unauthorized(res)
    };

    req.user = user;

    next()
};

export default { auth, tokenDecode};