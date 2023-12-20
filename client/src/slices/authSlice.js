import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo");
const initialState = {
	userInfo: userInfo ? JSON.parse(userInfo) : null,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		logOut: (state) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		},
	},
});

export const selectCurrentUser = (state) => state.auth;
export const { setCredentials, logOut } = slice.actions;
export default slice.reducer;
