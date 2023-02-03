import publicClient from "../client/public.client";

const genreEndpoints = {
	list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
	getList: async ({ mediaType }) => {
		try {
			const res = await publicClient.get(genreEndpoints.list(mediaType));

			return { res };
		} catch (err) {
			return { err };
		}
	},
};

export default genreApi;
