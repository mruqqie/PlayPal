const favUtils = {
	check: ({ listFavs, mediaId }) =>
		listFavs &&
		listFavs.find((e) => e.mediaId.toSring() === mediaId.toSring()) !==
			undefined,
};

export default favUtils;
