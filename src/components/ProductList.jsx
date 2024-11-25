import React from "react";

const ProductList = () => {
	const products = [
		{ id: 1, name: "Men's Shirt", price: 75, img: "images/p1.png" },
		{ id: 2, name: "Men's Shirt", price: 80, img: "images/p2.png" },
		{ id: 3, name: "Women's Dress", price: 68, img: "images/p3.png" },
		{ id: 4, name: "Women's Dress", price: 70, img: "images/p4.png" },
		{ id: 5, name: "Women's Dress", price: 75, img: "images/p5.png" },
		{ id: 6, name: "Women's Dress", price: 58, img: "images/p6.png" },
		{ id: 7, name: "Women's Dress", price: 80, img: "images/p7.png" },
		{ id: 8, name: "Men's Shirt", price: 65, img: "images/p8.png" },
		{ id: 9, name: "Men's Shirt", price: 65, img: "images/p9.png" },
		{ id: 10, name: "Men's Shirt", price: 65, img: "images/p10.png" },
		{ id: 11, name: "Men's Shirt", price: 65, img: "images/p11.png" },
		{ id: 12, name: "Women's Dress", price: 65, img: "images/p12.png" },
	];

	return (
		<section className="product_section layout_padding">
			<div className="container">
				<div className="heading_container heading_center">
					<h2>
						Our <span>Products</span>
					</h2>
				</div>
				<div className="row">
					{products.map((product) => (
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
									<img src={product.img} alt={product.name} />
								</div>
								<div className="detail-box">
									<h5>{product.name}</h5>
									<h6>${product.price}</h6>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="btn-box">
					<a href="#">View All Products</a>
				</div>
			</div>
		</section>
	);
};

export default ProductList;
