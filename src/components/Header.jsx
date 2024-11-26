import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import CartModal from "./CartModal";

const Header = () => {
	const { user, logout } = useContext(AuthContext);

	// State for cart modal visibility
	const [isCartOpen, setIsCartOpen] = useState(false);

	// State to store cart items
	const [cartItems, setCartItems] = useState([]);

	// Fetch cart items when the user is logged in
	useEffect(() => {
		if (user) {
			fetchCartItems();
		}
	}, [user]);

	// Function to fetch cart items
	const fetchCartItems = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/api/carts/", {
				headers: {
					Authorization: `Bearer ${user.token}`, // Add JWT token
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch cart items");
			}

			const data = await response.json();

			// Set cart items from the backend response
			setCartItems(data.items || []);
		} catch (error) {
			console.error("Error fetching cart items:", error);
			setCartItems([]);
		}
	};

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
										<span className="nav-link">Welcome ({user.username})</span>
									</li>
									<li className="nav-item">
										<button
											className="nav-link"
											onClick={logout}
											style={{
												cursor: "pointer",
												border: "none",
												background: "transparent",
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
								{/* Cart Icon with Click Event */}
								<a
									className="nav-link"
									href="#"
									onClick={() => setIsCartOpen(true)}
								>
									<i className="fa fa-shopping-cart" aria-hidden="true"></i>
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

			{/* Cart Modal */}
			<CartModal
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				cartItems={cartItems}
			/>
		</header>
	);
};

export default Header;
