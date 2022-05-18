import React from "react";
import "../stylesheets/footer.css";
function Footer() {
	return (
		<div>
			<section className="footer-pomodoro">
				<div className="share text-center py-4 px-0">
					<a
						href="https://twitter.com/ShilpeSaxena"
						target="_blank"
						rel="noreferrer"
						className="fab fa-twitter footer_for-pomodoro"
					></a>
					<a
						href="https://www.linkedin.com/in/shilpe-saxena-heartly-winner/"
						target="_blank"
						rel="noreferrer"
						className="fab fa-linkedin footer_for-pomodoro"
					></a>
					<a
						href="https://github.com/shilpe26"
						target="_blank"
						rel="noreferrer"
						className="fab fa-github footer_for-pomodoro"
					></a>
				</div>
				<div className="credit text-3xl text-center font-bold mt-8 py-3">
					Made with 💛 by
					<span className="span-note text-3xl font-bold"> Shilpe Saxena</span>
				</div>
			</section>
		</div>
	);
}

export { Footer };
