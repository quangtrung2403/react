import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMapVn } from "../../services/auth";

export const getMapAction = createAsyncThunk('map/getData', async () => {
	try {
		const response = await getMapVn();
		return response;
	} catch (error) {
		throw error;
	}
});

export const createMapReduces = (builder) => {
	builder
		.addCase(getMapAction.pending, (state) => {
			state.loadingMap = true;
			state.errorMap = null;
		})
		.addCase(getMapAction.fulfilled, (state, action) => {
			state.loadingMap = false;
			state.dataMap = action.payload;
			state.errorMap = null;
		})
		.addCase(getMapAction.rejected, (state, action) => {
			state.loadingMap = false;
			state.errorMap = action.error.message;
		});
};
