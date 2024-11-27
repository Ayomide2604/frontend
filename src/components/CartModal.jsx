import React, { useEffect, useState } from "react";
import api from "./api";

const CartModal = ({ isOpen, onClose }) => {
	const [cart, setCart] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [updatingItemId, setUpdatingItemId] = useState(null); // Track which item is being updated

	useEffect(() => {
		if (isOpen) fetchCart();
	}, [isOpen]);

	const fetchCart = async () => {
		setIsLoading(true);
		setErrorMessage("");

		try {
			const response = await api.get("/carts/");
			setCart(response.data);
		} catch (error) {
			setErrorMessage("Failed to load cart.");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteItem = async (itemId) => {
		try {
			await api.delete(`/carts/${cart.id}/items/${itemId}/`);
			setCart((prevCart) => ({
				...prevCart,
				cart_items: prevCart.cart_items.filter((item) => item.id !== itemId),
			}));
		} catch (error) {
			console.error("Failed to delete item:", error);
		}
	};

	const handleAddOrUpdateItem = async (itemId, newQuantity) => {
		setUpdatingItemId(itemId); // Set item being updated

		try {
			const response = await api.patch(`/carts/${cart.id}/items/${itemId}/`, {
				quantity: newQuantity,
			});

			setCart((prevCart) => ({
				...prevCart,
				cart_items: prevCart.cart_items.map((item) =>
					item.id === itemId ? { ...item, quantity: newQuantity } : item
				),
			}));
		} catch (error) {
			console.error("Failed to update item:", error);
		} finally {
			setUpdatingItemId(null); // Reset after update
		}
	};

	// Calculate total price
	const getTotalPrice = () => {
		if (cart && cart.cart_items) {
			return cart.cart_items.reduce(
				(acc, item) => acc + item.quantity * item.product.price,
				0
			);
		}
		return 0;
	};

	const handleCheckout = async () => {
		alert("Checkout successful!");
	};

	if (!isOpen) return null;

	return (
		<div className="modal show d-block" tabIndex="-1">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Your Cart</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">
						{isLoading ? (
							<p>Loading...</p>
						) : errorMessage ? (
							<p>{errorMessage}</p>
						) : cart && cart.cart_items.length > 0 ? (
							<table className="table table-bordered">
								<thead>
									<tr>
										<th scope="col">Image</th>
										<th scope="col">Product</th>
										<th scope="col">Price</th>
										<th scope="col">Quantity</th>
										<th scope="col">Total</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody>
									{cart.cart_items.map((item) => (
										<tr key={item.id}>
											<td>
												<img
													src={item.product_image || "images/default.png"}
													alt={item.product.name}
													className="img-fluid"
													style={{
														width: "50px",
														height: "50px",
														objectFit: "cover",
													}}
												/>
											</td>
											<td>{item.product.name}</td>
											<td>${item.product.price}</td>
											<td>
												<div className="d-flex align-items-center">
													<button
														onClick={() =>
															handleAddOrUpdateItem(item.id, item.quantity + 1)
														}
														className="btn btn-sm btn-primary mx-1"
														disabled={updatingItemId === item.id}
													>
														+
													</button>
													<span>{item.quantity}</span>
													<button
														onClick={() =>
															handleAddOrUpdateItem(item.id, item.quantity - 1)
														}
														className="btn btn-sm btn-warning mx-1"
														disabled={
															item.quantity === 1 || updatingItemId === item.id
														}
													>
														-
													</button>
												</div>
											</td>
											<td>${item.quantity * item.product.price}</td>
											<td>
												<button
													onClick={() => handleDeleteItem(item.id)}
													className="btn btn-sm btn-danger"
													disabled={updatingItemId === item.id}
												>
													Remove
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>Your cart is empty.</p>
						)}
					</div>
					<div className="modal-footer">
						<h5 className="me-auto">Total: ${getTotalPrice()}</h5>
						<button
							type="button"
							className="btn btn-secondary"
							onClick={onClose}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-success"
							onClick={handleCheckout}
							disabled={!cart || cart.cart_items.length === 0}
						>
							Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
