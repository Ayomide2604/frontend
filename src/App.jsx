import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Product from "./screens/Products";

function App() {
	return (
		<Router>
			<div className="hero_area">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/product" element={<Product />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
