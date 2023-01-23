import axios from "axios";
import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi = {
    mediaList: async ({ mediaType, mediaCat, page }) => await axiosClient.get(
        tmdbEndpoints.mediaList({ mediaType, mediaCat, page })
    ),
    mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaDetail({ mediaType, mediaId }) 
    ),
    mediaGenre: async ({ mediaType }) => await axiosClient.get(
        tmdbEndpoints.mediaGenre({ mediaType })
    ),
    mediaCredits: async ({ mediaType, mediaId}) => await axiosClient.get(
        tmdbEndpoints.mediaCredits({ mediaType, mediaId})
    ),
    mediaVideos: async ({ mediaType, mediaId}) => await axiosClient.get(
        tmdbEndpoints.mediaVideos({ mediaType, mediaId})
    ),
    mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
    ),
    mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaImages({ mediaType, mediaId })
    ),
    mediaSearch: async({ mediaType, query, page }) => await axiosClient.get(
        tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),
    personDetail: async ({ personId }) => await axiosClient.get(
        tmdbEndpoints.personDetail({ personId })
    ),
    personMedias: async ({ personId }) => await axiosClient.get(
        tmdbEndpoints.personMedias({ personId })
    )
};

export default tmdbApi;