import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

const mediaEndpoints = {
	list: ({ mediaType, mediaCat, page }) =>
		`${mediaType}/${mediaCat}?page=${page}`,
	detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
	search: ({ mediaType, query, page }) =>
		`${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
	getList: async ({ mediaType, mediaCat, page }) => {
		try {
			const res = await publicClient.get(
				mediaEndpoints.list({ mediaType, mediaCat, page })
			);

			return { res };
		} catch (err) {
			return { err };
		}
	},
	getDetail: async ({ mediaTyps, mediaId }) => {
		try {
			const res = await privateClient.get(
				mediaEndpoints.detail({ mediaType, mediaId })
			);

			return { res };
		} catch (err) {
			return { err };
		}
	},
	search: async ({ mediaType, query, page }) => {
		try {
			const res = await privateClient.get(
				mediaEndpoints.search({ mediaType, query, page })
			);

			return { res };
		} catch (err) {
			return { err };
		}
	},
};

export default mediaApi;
