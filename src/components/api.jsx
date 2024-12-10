import axios from "axios";

const API_BASE_URL = "https://backend-vvrq.onrender.com/api/";

const api = axios.create({
	baseURL: API_BASE_URL,
});

// Attach the JWT token for authenticated requests
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("access");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
