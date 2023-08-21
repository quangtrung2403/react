import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGetRoles, ApigetUser, CreateNewUser, UpdateUser, deleteUser } from "../../services/auth";

export const getUserAction = createAsyncThunk("user", async ({ page, itemPerpage, sort, input, roles, date_start, date_end, active }) => {
	try {
		const response = await ApigetUser(page, itemPerpage, sort, input, roles, date_start, date_end, active);
		return response;
	} catch (error) {
		throw error;
	}
});

export const getUserReduces = (builder) => {
	builder
		.addCase(getUserAction.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(getUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload.list;
			state.pagination = action.payload.pagination;
			state.error = null;
		})
		.addCase(getUserAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
};


export const getRolesAction = createAsyncThunk("roles", async () => {
	try {
		const response = await ApiGetRoles();
		return response;
	} catch (error) {
		throw error;
	}
})

export const getRolesReduces = (builder) => {
	builder
		.addCase(getRolesAction.pending, (state) => {
			state.loadingRoles = true;
			state.error = null;
		})
		.addCase(getRolesAction.fulfilled, (state, action) => {
			state.loadingRoles = false;
			state.dataRoles = action.payload;
			state.error = null;
		})
		.addCase(getRolesAction.rejected, (state, action) => {
			state.loadingRoles = false;
			state.error = action.error.message;
		});
}

export const createNewUserAction = createAsyncThunk('user/createUser', async ({ data, role_ids }) => {
	try {
		const response = CreateNewUser(data, role_ids);
		return response;
	} catch (error) {
		alert("Dữ liệu không thỏa mãn hoặc đã tồn tại trong hệ thống");
		return error;
	}
});

export const createUserReducer = (builder) => {
	builder
		.addCase(createNewUserAction.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(createNewUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		})
		.addCase(createNewUserAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
};

export const deleteUserAction = createAsyncThunk('user/deleteUser', async ({ id }) => {
	try {
		const response = deleteUser(id);
		return response;
	} catch (error) {
		return error;
	}
});

export const deleteUserReduces = (builder) => {
	builder
		.addCase(deleteUserAction.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(deleteUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		})
		.addCase(deleteUserAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
}

export const UpdateUserAction = createAsyncThunk('user/updateUser', async ({ id, data, role_ids }) => {
	try {
		const response = UpdateUser(id, data, role_ids);
		return response;
	} catch (error) {
		alert("Cập Nhật Dữ liệu Người Dùng không thành công . Vui lòng kiểm tra lại");
		return error;
	}
});

export const updateUserReduces = (builder) => {
	builder
		.addCase(UpdateUserAction.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(UpdateUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		})
		.addCase(UpdateUserAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
}
