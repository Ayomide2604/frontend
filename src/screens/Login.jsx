import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const credentials = {
				username: username.toLowerCase(),
				password,
			};

			await login(credentials); // Call the login function from context

			setError(null);
			alert("Login successful!");
			navigate("/"); // Navigate after successful login
		} catch (err) {
			console.error(err.response?.data);
			setError(err.response?.data?.detail || "Invalid username or password");
		}
	};

	return (
		<>
			<section className="inner_page_head">
				<div className="container_fuild">
					<div className="row">
						<div className="col-md-12">
							<div className="full">
								<h3>Login</h3>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section style={{ padding: "40px 0" }}>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<div
								style={{
									background: "#f8f9fa",
									padding: "30px",
									borderRadius: "10px",
									boxShadow: "0 0 10px rgba(0,0,0,0.1)",
								}}
							>
								{error && (
									<p style={{ color: "red", textAlign: "center" }}>{error}</p>
								)}
								<form onSubmit={handleLogin}>
									<div style={{ marginBottom: "15px" }}>
										<label>Username:</label>
										<input
											type="text"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											placeholder="Enter username"
											autoComplete="off"
											style={{
												width: "100%",
												padding: "10px",
												border: "1px solid #ddd",
												borderRadius: "5px",
												marginTop: "5px",
											}}
										/>
									</div>
									<div style={{ marginBottom: "15px" }}>
										<label>Password:</label>
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Enter password"
											style={{
												width: "100%",
												padding: "10px",
												border: "1px solid #ddd",
												borderRadius: "5px",
												marginTop: "5px",
											}}
										/>
									</div>
									<button
										type="submit"
										style={{
											width: "100%",
											padding: "12px",
											backgroundColor: "#007bff",
											color: "#fff",
											border: "none",
											borderRadius: "5px",
											cursor: "pointer",
										}}
									>
										Login
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Login;
