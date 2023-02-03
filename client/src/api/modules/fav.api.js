import privateClient from "../client/private.client";

const favEndpoints = {
	list: "user/favorites",
	add: "user/favorites",
	remove: ({ favId }) => `user/favorites/${favId}`,
};

const favApi = {
	getList: async () => {
		try {
			res = await privateClient.get(favEndpoints.list);

			return { res };
		} catch (err) {
			return { err };
		}
	},
	add: async (mediaId, mediaType, mediaTitle, mediaPoster, mediaRate) => {
		try {
			res = await privateClient.post(favEndpoints.add, {
				mediaId,
				mediaType,
				mediaTitle,
				mediaPoster,
				mediaRate,
			});

			return { res };
		} catch (err) {
			return { err };
		}
	},
	remove: async ({ favId }) => {
		try {
			const res = await privateClient.delete(favEndpoints.remove({ favId }));

			return { res };
		} catch (err) {
			return { err };
		}
	},
};

export default favApi;
