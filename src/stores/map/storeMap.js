import { createSlice } from "@reduxjs/toolkit";
import { createMapReduces } from "./actionMap";

const initialState = {
	dataMap: [],
	loadingMap: false,
	errorMap: null,
};


export const mapDetail = createSlice({
	name: "map",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		createMapReduces(builder); 
	},
});

export const mapReducer = mapDetail.reducer;