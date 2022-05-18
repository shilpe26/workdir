import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./Context/todo-context";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<TodoProvider>
				<App />
			</TodoProvider>
		</BrowserRouter>
	</React.StrictMode>
);
