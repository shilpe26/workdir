import React, { useEffect } from "react";

export function useTitle(title) {
	useEffect(() => {
		document.title = title;
	});
}
