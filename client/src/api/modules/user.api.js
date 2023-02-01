import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

const userEndpoints = {
	signin: "user/signin",
	signup: "user/signup",
	getInfo: "user/info",
	passwordUpdate: "user/update_password",
};

const userApi = {
	signin: async ({ username, password }) => {
		try {
			console.log("Send Request");
			const res = await publicClient.post(userEndpoints.signin, {
				username,
				password,
			});
			return { res };
		} catch (err) {
			console.log("err");
			return { err };
		}
	},
	signup: async ({ username, password, confirmPassword, displayName }) => {
		try {
			const res = await publicClient.post(userEndpoints.signup, {
				username,
				password,
				confirmPassword,
				displayName,
			});

			return { res };
		} catch (err) {
			return { err };
		}
	},
	getInfo: async () => {
		try {
			const res = await privateClient.get(userEndpoints.getInfo);

			return { res };
		} catch (err) {
			return { err };
		}
	},
	passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
		try {
			const res = await privateClient.put(userEndpoints.passwordUpdate, {
				password,
				newPassword,
				confirmNewPassword,
			});

			return { res };
		} catch (err) {
			return { err };
		}
	},
};

export default userApi;
