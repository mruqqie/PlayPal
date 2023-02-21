import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
	name: "GlobalLoading",
	initialState: {
		globalLoading: false,
	},
	reducers: {
		setglobalLoading: (state, action) => {
			state.globalLoading = action.payload;
		},
	},
});

export const { setglobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
