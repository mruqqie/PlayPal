import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import resHandler from "../handlers/res.handler.js";

const signup = async (req, res) => {
	try {
		const { username, password, displayName } = req.body;

		const checkUser = await userModel.findOne({ username });
		if (checkUser) {
			return resHandler.badReq(res, "Username already in use.");
		}

		const user = new userModel();

		user.displayName = displayName;
		user.username = username;
		user.setPassword(password);
		await user.save();

		const payload = { data: user.id };
		const options = { expiresIn: "24h" };
		const token = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, options);

		resHandler.created(res, {
			token,
			...user._doc,
			id: user.id,
		});
	} catch {
		resHandler.error(res);
	}
};

const signin = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await userModel
			.findOne({ username })
			.select("username password salt id displayName");

		if (!user) {
			return resHandler.badReq(res, "User not found.");
		}

		if (!user.validPassword(password)) {
			return resHandler.badReq(res, "Wrong password");
		}

		const payload = { data: user.id };
		const options = { expiresIn: "24h" };
		const token = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, options);

		user.password = undefined;
		user.salt = undefined;

		resHandler.created(res, {
			token,
			...user._doc,
			id: user.id,
		});
	} catch {
		resHandler.error(res);
	}
};

const updatePassword = async (req, res) => {
	try {
		const { password, newPassword } = req.body;

		const user = await userModel
			.findById(req.user.id)
			.select("password id salt");

		if (!user) {
			return resHandler.unauthorized(res);
		}

		if (!user.validPassword(password)) {
			return resHandler.badReq(res, "Wrong password.");
		}

		user.setPassword(newPassword);
		await user.save();

		resHandler.ok(res);
	} catch {
		resHandler.error(res);
	}
};

const getInfo = async (req, res) => {
	try {
		const user = await userModel.findById(req.user.id);

		if (!user) {
			resHandler.notFound(res);
		}

		resHandler.ok(res, user);
	} catch {
		resHandler.error(res);
	}
};

export default {
	signup,
	signin,
	updatePassword,
	getInfo,
};
