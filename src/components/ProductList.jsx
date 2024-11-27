import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);

	const fetchProducts = (url) => {
		setLoading(true);
		axios
			.get(url)
			.then((response) => {
				setProducts(response.data.results);
				setNextPage(response.data.next);
				setPrevPage(response.data.previous);
				setLoading(false);
			})
			.catch((error) => {
				setError("There was an error fetching the products");
				setLoading(false);
			});
	};

	useEffect(() => {
		// Fetch the first page of products
		fetchProducts("http://127.0.0.1:8000/api/products/");
	}, []);

	if (loading) {
		return <p>Loading products...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

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
											<Link to={`/products/${product.id}`} className="option1">
												View Product
											</Link>
											<a href="#" className="option2">
												Buy Now
											</a>
										</div>
									</div>
									<div className="img-box">
										<img
											src={
												product.images.length > 0
													? product.images[0].image
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
				<section>
					<div className="d-flex justify-content-center">
						<nav>
							<ul className="pagination">
								<li className={`page-item ${!prevPage ? "disabled" : ""}`}>
									<button
										className="page-link"
										onClick={() => fetchProducts(prevPage)}
										disabled={!prevPage}
									>
										Previous
									</button>
								</li>
								<li className={`page-item ${!nextPage ? "disabled" : ""}`}>
									<button
										className="page-link"
										onClick={() => fetchProducts(nextPage)}
										disabled={!nextPage}
									>
										Next
									</button>
								</li>
							</ul>
						</nav>
					</div>
				</section>
			</div>
		</section>
	);
};

export default ProductList;
