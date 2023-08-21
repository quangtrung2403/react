import { createSlice } from "@reduxjs/toolkit";
import { createUserReducer, deleteUserReduces, getRolesReduces, getUserReduces, updateUserReduces } from "./actionUser";

export const userDetail = createSlice({
	name: "user",
	initialState: {
		data: [],
		pagination: {},
		loading: false,
		error: "",
	},
	extraReducers: (builder) => {
		getUserReduces(builder);
		createUserReducer(builder);
		deleteUserReduces(builder);
		updateUserReduces(builder);
	},
});

export const roles = createSlice({
	name: "roles",
	initialState: {
		dataRoles: [],
		loadingRoles: false,
		error: null,
	},
	extraReducers: (builder) => {
		getRolesReduces(builder);
	},
});

export const rolesReducer = roles.reducer;
export const userReducer = userDetail.reducer;