import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "popper.js";
import "./styles/css/bootstrap.css";
import "./styles/css/font-awesome.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles/css/style.css";
import "./styles/css/responsive.css";
import AuthProvider from "./contexts/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>
);
