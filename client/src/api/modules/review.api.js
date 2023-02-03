import privateClient from "../client/private.client.js";

const reviewEndpoints = {
	list: "reviews",
	add: "reviews",
	remove: ({ reviewId }) => `review/${reviewId}`,
};

const reviewApi = {
	getList: async () => {
		try {
			const res = await privateClient.get(reviewEndpoints.list);

			return { res };
		} catch (err) {
			return { err };
		}
	},
	add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
		try {
			const res = privateClient.post(reviewEndpoints.add, {
				mediaId,
				mediaType,
				mediaTitle,
				mediaPoster,
				content,
			});

			return { res };
		} catch (err) {
			return { err };
		}
	},
	remove: async ({ reviewId }) => {
		try {
			const res = privateClient.delete(reviewEndpoints.remove({ reviewId }));

			return { res };
		} catch (err) {
			return { err };
		}
	},
};

export default reviewApi;
