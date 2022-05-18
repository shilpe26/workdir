import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assests/pomodoro.png";
import "../stylesheets/navbar.css";
function Navbar() {
	return (
		<div>
			<nav className="pomodoro-nav fixed top-0 right-0 left-0">
				<h1>
					<Link to="/">
						<img className="ml-8" src={Logo} alt="pomodoro-logo" />
					</Link>
				</h1>
			</nav>
		</div>
	);
}

export { Navbar };
