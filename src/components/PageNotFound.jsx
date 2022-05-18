import React from "react";
import ErrorImage from "../assests/Error.png";
import "../stylesheets/page-not-found.css";
function PageNotFound() {
	return (
		<div className="flex items-center justify-center">
			<img className="error-404 w-50p" src={ErrorImage} alt="404-error" />
		</div>
	);
}

export { PageNotFound };
