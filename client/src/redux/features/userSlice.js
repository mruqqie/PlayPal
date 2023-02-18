import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "User",
	initialState: {
		user: null,
		listFavs: [],
	},
	reducers: {
		setUser: (state, action) => {
			if (action.payload === null) {
				localStorage.removeItem("actkn");
			} else {
				if (action.payload.token) {
					localStorage.setItem("actkn", action.payload.token);
				}
			}

			state.user = action.payload;
		},
		setListFavs: (state, action) => {
			state.listFavs = action.payload;
		},
		removeFav: (state, action) => {
			const { mediaId } = action.payload;
			state.listFavs = [...state.listFavs].filter(
				(e) => e.mediaId.toString() !== mediaId.toString()
			);
		},
		addFav: (state, action) => {
			state.listFavs = [action.payload, ...state.listFavs];
		},
	},
});

export const { setUser, setListFavs, addFav, removeFav } = userSlice.actions;

export default userSlice.reducer;
