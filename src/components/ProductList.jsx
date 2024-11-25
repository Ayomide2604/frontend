import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log("Fetching products...");

		axios
			.get("http://127.0.0.1:8000/api/products/")
			.then((response) => {
				console.log("Products fetched successfully:", response.data);
				setProducts(response.data.results);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
				setError("There was an error fetching the products");
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <p>Loading products...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	// Placeholder image in case product has no images
	const placeholderImage = "images/default.png";

	return (
		<section className="product_section layout_padding">
			<div className="container">
				<div className="heading_container heading_center">
					<h2>
						Our <span>Products</span>
					</h2>
				</div>
				<div className="row">
					{products.length === 0 ? (
						<p>No products available.</p>
					) : (
						products.map((product) => (
							<div className="col-sm-6 col-md-4 col-lg-4" key={product.id}>
								<div className="box">
									<div className="option_container">
										<div className="options">
											<a href="#" className="option1">
												Add To Cart
											</a>
											<a href="#" className="option2">
												Buy Now
											</a>
										</div>
									</div>
									<div className="img-box">
										<img
											src={
												product.images.length > 0
													? product.images[0].image // Access the `image` field here
													: placeholderImage
											}
											alt={product.name}
										/>
									</div>
									<div className="detail-box">
										<h5>{product.name}</h5>
										<h6>${product.price}</h6>
									</div>
								</div>
							</div>
						))
					)}
				</div>
				<div className="btn-box">
					<a href="#">View All Products</a>
				</div>
			</div>
		</section>
	);
};

export default ProductList;
