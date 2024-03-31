
/**
 * api.js
 * 
 * This file contains the API URL generator function.
 */





/**
 * @typedef {(
 *  "/" |
 *  "/auth" | "/auth/" |
 *  "/auth/login" |
 *  "/auth/logout" |
 *  "/auth/signup" |
 *  "/users" | "/users/" |
 *  "/users/profile" 
 * )} APIRoute
 */


/**
 * This assumes that the Flask Server is running on port 5000.
 * If it is not on 5000, change this.
 */
const flaskServerPort = 5000;
const apiServerURLFragment = `http://localhost:${flaskServerPort}`;
/**
 * 
 * @param {APIRoute} route 
 */
export function getApiURL(route) {
	// remove a trailing forward-slash if any
	if (route.endsWith("/")) {
		route = route.slice(0, -1);
	}
	const output = apiServerURLFragment + route;
	console.info(`API URL: ${output}`);
	return output;
};

// "End of File";