import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api"; // Make sure your API call is set up
import CartModal from "./CartModal"; // Import CartModal

const ProductDetail = () => {
	const { id } = useParams(); // Get the product ID from the URL
	const navigate = useNavigate(); // For navigation (e.g., going back)

	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [cart, setCart] = useState(null); // Track cart state
	const [isCartModalOpen, setCartModalOpen] = useState(false); // Track cart modal state

	// Fetch product details when component mounts
	useEffect(() => {
		const fetchProductDetail = async () => {
			try {
				const response = await api.get(`/products/${id}`);
				setProduct(response.data);
			} catch (error) {
				setErrorMessage("Failed to fetch product details");
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProductDetail();
	}, [id]);

	// Fetch cart initially
	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await api.get("/carts/");
				setCart(response.data); // Set the cart state
			} catch (error) {
				console.error("Failed to fetch cart", error);
			}
		};

		fetchCart(); // Fetch the cart initially
	}, []);

	const placeholderImage = "/images/default.png";

	const handleAddToCart = async () => {
		try {
			// Call the API to add the product to the cart with a default quantity of 1
			const response = await api.post(`/products/${product.id}/add_to_cart/`, {
				quantity: 1, // Always add the product with a quantity of 1
			});

			// Update the cart state with the new cart data from the API response
			setCart(response.data.cart);

			// Optionally show a success message
			console.log(`Added 1 of ${product.name} to the cart.`);

			// Open the CartModal to display the cart
			setCartModalOpen(true); // Automatically open the cart modal
		} catch (error) {
			console.error("Failed to add to cart:", error);
			setErrorMessage("Error adding item to cart.");
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (errorMessage) {
		return <p>{errorMessage}</p>;
	}

	return (
		<div className="container py-5">
			<button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
				Go Back
			</button>
			{product && (
				<div className="row">
					<div className="col-md-6">
						<img
							src={
								product.images.length > 0
									? product.images[0].image
									: placeholderImage
							}
							alt={product.name}
							className="img-fluid rounded"
						/>
					</div>
					<div className="col-md-6">
						<h2>{product.name}</h2>
						<p>{product.description}</p>
						<p className="h4">Price: ${product.price}</p>
						<button onClick={handleAddToCart} className="btn btn-primary mt-3">
							Add to Cart
						</button>
					</div>
				</div>
			)}

			{/* Your Cart Modal */}
			{isCartModalOpen && (
				<CartModal
					isOpen={isCartModalOpen}
					onClose={() => setCartModalOpen(false)}
					cart={cart} // Pass the cart state to the modal
				/>
			)}
		</div>
	);
};

export default ProductDetail;
