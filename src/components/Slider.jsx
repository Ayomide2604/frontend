import React from "react";

const SliderSection = () => {
	return (
		<section className="slider_section">
			<div className="slider_bg_box">
				<img src="/images/slider-bg.jpg" alt="Slider Background" />
			</div>
			<div
				id="carouselExample"
				className="carousel slide"
				data-bs-ride="carousel"
			>
				<div className="carousel-inner">
					{/* Slide 1 */}
					<div className="carousel-item active">
						<div className="container">
							<div className="row">
								<div className="col-md-7 col-lg-6">
									<div className="detail-box">
										<h1>
											<span>Sale 20% Off</span>
											<br />
											On Everything
										</h1>
										<p>
											Explicabo esse amet tempora quibusdam laudantium, laborum
											eaque magnam fugiat hic? Esse dicta aliquid error
											repudiandae earum suscipit fugiat molestias, veniam, vel
											architecto veritatis delectus repellat modi impedit sequi.
										</p>
										<div className="btn-box">
											<a href="#" className="btn1">
												Shop Now
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Slide 2 */}
					<div className="carousel-item">
						<div className="container">
							<div className="row">
								<div className="col-md-7 col-lg-6">
									<div className="detail-box">
										<h1>
											<span>Sale 20% Off</span>
											<br />
											On Everything
										</h1>
										<p>
											Explicabo esse amet tempora quibusdam laudantium, laborum
											eaque magnam fugiat hic? Esse dicta aliquid error
											repudiandae earum suscipit fugiat molestias, veniam, vel
											architecto veritatis delectus repellat modi impedit sequi.
										</p>
										<div className="btn-box">
											<a href="#" className="btn1">
												Shop Now
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Slide 3 */}
					<div className="carousel-item">
						<div className="container">
							<div className="row">
								<div className="col-md-7 col-lg-6">
									<div className="detail-box">
										<h1>
											<span>Sale 20% Off</span>
											<br />
											On Everything
										</h1>
										<p>
											Explicabo esse amet tempora quibusdam laudantium, laborum
											eaque magnam fugiat hic? Esse dicta aliquid error
											repudiandae earum suscipit fugiat molestias, veniam, vel
											architecto veritatis delectus repellat modi impedit sequi.
										</p>
										<div className="btn-box">
											<a href="#" className="btn1">
												Shop Now
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<ol className="carousel-indicators">
						<li
							data-bs-target="#carouselExample"
							data-bs-slide-to="0"
							className="active"
						></li>
						<li data-bs-target="#carouselExample" data-bs-slide-to="1"></li>
						<li data-bs-target="#carouselExample" data-bs-slide-to="2"></li>
					</ol>
				</div>

				{/* Controls */}
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExample"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExample"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</section>
	);
};

export default SliderSection;
