import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://127.0.0.1:5000/api/v1";

const publicClient = axios.create({
	baseUrl,
	paramsSerializer: {
		encode: (params) => queryString.stringify(params),
	},
});

publicClient.interceptors.request.use(async (config) => {
	return {
		...config,
		headers: {
			"Content-Type": "application/json",
		},
	};
});

publicClient.interceptors.response.use(
	(res) => {
		if (res && res.data) return res.data;
	},
	(err) => {
		throw err.res.data;
	}
);

export default publicClient;
