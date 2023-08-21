import { instance } from "./axios";
import { getToken } from "./handelToken";
import queryString from 'query-string';

export const apiLogin = (data) =>
	instance
		.post(`/web-authenticate`, {
			password: data.password,
			username: data.username,
			headers: {
				'Origin': 'http://localhost:3000',
			},
		})
		.then((res) => res.data);
export const apiGetMe = () =>
	instance
		.get("api/me", {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		})
		.then((res) => res.data.user);

export const apiLogout = () =>
	instance
		.post(
			"api/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		)
		.then((res) => res.data);

export const ApigetUser = async (page, itemPerpage, sort, input, roles, date_start, date_end, active) => {
	const queryParams = queryString.stringify({
		paginate: true,
		page,
		perpage: itemPerpage,
		sort,
		search: input,
		role_id: roles,
		inactive: active,
	}, {
		encode: false,
	}
	);

	const dateQueryParams = queryString.stringify({
		with: 'roles,createdBy,provinces',
		date_start,
		date_end,
	}, {
		encode: false,
	}
	);

	const fullQueryString = queryParams + '&' + dateQueryParams;
	try {
		const res = await instance
			.get(`/api/users?${fullQueryString}`, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
		if (res.data === undefined) {
			throw new Error("Kiểm tra dữ liệu trả về có tìm thấy không");
		}
		return res.data;
	} catch (error) {
		console.error("Lỗi khi gọi API", error);
		throw error;
	}
};

export const ApiGetRoles = () =>
	instance
		.get("api/roles", {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		})
		.then((res) => res.data)
		.catch((error) => {
			console.error("Error fetching roles data:", error);
			throw error;
		});

export const CreateNewUser = (data, role_ids) => {
	const postData = {
		name: data.name,
		username: data.username,
		email: data.email,
		password: data.password,
		conFirmPassword: data.conFirmPassword,
		mobile: data.mobile,
		role_ids: role_ids,
	};
	instance
		.post('api/users', postData, { headers: { Authorization: `Bearer ${getToken()}` } })
		.then(response => response.data)
		.catch(error => {
			return error
		});
}

export const deleteUser = (id) => {
	instance
		.delete(`api/users/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
		.then(response => response.data)
		.catch(error => {
			return error
		});
}

export const UpdateUser = (id, data, role_ids) => {
	const updateData = {
		name: data.name,
		username: data.username,
		email: data.email,
		mobile: data.mobile,
		role_ids: role_ids,
		id: id,
	};
	instance
		.put(`api/users/${id}`, updateData, { headers: { Authorization: `Bearer ${getToken()}` } })
		.then(response => response.data)
		.catch(error => {
			return error
		});
}

export const getMapVn = async () => {
	try {
		const response = await instance.get('api/provinces?showGeometry=true');
		return response.data;
	} catch (error) {
		throw error;
	}
};