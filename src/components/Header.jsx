import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
	const { user, logout } = useContext(AuthContext);

	useEffect(() => {
		console.log("User in Header:", user);
	}, [user]);

	return (
		<header className="header_section">
			<div className="container">
				<nav className="navbar navbar-expand-lg custom_nav-container">
					<Link className="navbar-brand" to="/">
						<img width="250" src="/images/logo.png" alt="Logo" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className=""></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/about">
									About
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/product">
									Products
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/contact">
									Contact
								</Link>
							</li>
							{user ? (
								<>
									<li className="nav-item">
										<span className="nav-link">Welcome({user.username})</span>
									</li>
									<li className="nav-item">
										<button
											className="nav-link"
											onClick={logout}
											style={{
												background: "none",
												border: "none",
												cursor: "pointer",
											}}
										>
											Logout
										</button>
									</li>
								</>
							) : (
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
							)}
							<li className="nav-item">
								<a className="nav-link" href="#">
									{/* Your SVG code here */}
								</a>
							</li>
							<form className="form-inline">
								<button
									className="btn my-2 my-sm-0 nav_search-btn"
									type="submit"
								>
									<i className="fa fa-search" aria-hidden="true"></i>
								</button>
							</form>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
