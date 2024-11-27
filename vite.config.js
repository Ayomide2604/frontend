import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0", // Allow external connections (required for Render)
		port: parseInt(process.env.PORT) || 3000, // Use PORT from the environment or default to 3000
	},
});
