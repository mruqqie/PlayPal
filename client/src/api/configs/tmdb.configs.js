const mediaType = {
	movie: "movie",
	tv: "tv",
};

const mediaCat = {
	popular: "popular",
	top_rated: "top_rated",
};

const backdropPath = (imgEndpoint) =>
	`https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) =>
	`https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) =>
	`https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
	mediaType,
	mediaCat,
	backdropPath,
	posterPath,
	youtubePath,
};

export default tmdbConfigs;
