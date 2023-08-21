import { useState, useCallback } from "react";
import axios from "axios";

export const useFetch = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const getData = useCallback(async (url, params = {}) => {
		try {
			setLoading(true);
			const response = await axios.get(url, { params });
			setData(response.data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, []);
	return { data, setData, error, setError, loading, setLoading, getData };
};
