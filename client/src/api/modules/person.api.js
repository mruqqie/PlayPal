import publicClient from "../client/public.client";

const personEndpoints = {
	detail: ({ personId }) => `person/${personId}`,
	medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
	detail: async ({ personId }) => {
		try {
			const res = await publicClient.get(personEndpoints.detail({ personId }));

			return { res };
		} catch (err) {
			return { err };
		}
	},
	medias: async ({ personId }) => {
		try {
			const res = await publicClient.get(personEndpoints.medias({ personId }));

			return { res };
		} catch (err) {
			return { err };
		}
	},
};

export default personApi;
