import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("access") || null);
	// Log in the user
	const login = async (credentials) => {
		try {
			const response = await axios.post(
				"https://backend-vvrq.onrender.com/api/auth/jwt/create",
				credentials
			);

			const { access, refresh } = response.data;

			// Save tokens to localStorage
			localStorage.setItem("access", access);
			localStorage.setItem("refresh", refresh);

			// Update AuthContext with the new token
			setToken(access);

			// Now fetch the user's details
			const userResponse = await axios.get(
				"https://backend-vvrq.onrender.com/api/auth/users/me",
				{
					headers: { Authorization: `Bearer ${access}` },
				}
			);

			// Set the user information from the response
			setUser(userResponse.data);
		} catch (error) {
			console.error("Login failed", error);
			// Optionally show an error message to the user (e.g., toast or alert)
		}
	};

	// Log out the user
	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("access");
		localStorage.removeItem("refresh");
	};

	// Check if a user is already logged in when the app loads
	useEffect(() => {
		if (token) {
			// Fetch user details after token is set
			const fetchUser = async () => {
				try {
					const response = await axios.get(
						"https://backend-vvrq.onrender.com/api/auth/users/me",
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					setUser(response.data);
				} catch (error) {
					console.error("Failed to fetch user details", error);
					logout(); // Log the user out if the API call fails
				}
			};
			fetchUser();
		} else {
			setUser(null); // If no token, reset user to null
		}
	}, [token]);

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
