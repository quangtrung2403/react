import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/store.js";
import { rolesReducer, userReducer } from "./user/storeUser.js";
import { mapReducer } from "./map/storeMap.js";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	roles: rolesReducer,
	map: mapReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			thunk: true,
			immutableCheck: true,
			serializableCheck: false,
		});
	},
});

export default store;
