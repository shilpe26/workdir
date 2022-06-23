import { Link } from "react-router-dom";
import LandingImage from "../../assests/pomo-home.png";
import "./home.css";
function Home() {
	return (
		<div className="container-note">
			<div>
				<div className="content-note ml-32 mt-48">
					<h2 className="text-9xl font-semibold mt-60 mb-8">
						Do Remarkable Work
					</h2>

					<p className="para-note text-4xl">
						Stay Focused at work and get more done with Workdir.
					</p>
				</div>
				<div className="btn-note text-center mt-8">
					<Link to="/todo">
						<button
							type="button"
							className="btn btn-primary font-semibold cursor-pointer rounded-3xl p-2	 mx-32"
						>
							Join Now
						</button>
					</Link>
				</div>
				<h4 className="account-detail font-normal mt-4">
					<span className="span-note text-md">Already have an account?</span>
				</h4>
			</div>

			<div className="image-note">
				<img src={LandingImage} alt="landing-page" className="bottom-12" />
			</div>
		</div>
	);
}

export { Home };
