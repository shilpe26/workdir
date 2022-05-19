import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PageNotFound, Navbar, Footer } from "../src/components/Components";
import { Home, Todo, PomoClock } from "../src/pages/Pages";
function App() {
	return (
		<div className="App flex flex-col min-h-screen">
			<div>
				<Navbar />
			</div>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/todo" element={<Todo />} />
					<Route path="*" element={<PageNotFound />} />
					<Route path="/pomoclock" element={<PomoClock />} />
				</Routes>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default App;
