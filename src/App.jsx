import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Footer from "./components/Footer";

function App() {
	return (
		<div class="hero_area">
			<Header />
			<Slider />
			<Footer />
		</div>
	);
}

export default App;
