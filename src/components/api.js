
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
*  "/users/profile" |
*  "/claims" | "/claims/" | 
*  "/claims/{id}" | 
*  "/claims/{id}/images" | 
*  "/claims/{id}/review" | 
*  "/claims/{id}/submit" | 
*  "/claims/{id}/delete" | 
*  "/claims/{id}/appeal" | 
*  "/claims/managed-by"
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
* @param {unknown[]} substitutions
*/
export function getApiURL(route, substitutions=[]) {

	// get segments of {a} {b} {c}
	const pathSegments = route.split("/");
	// substitute each segment with the corresponding value
	let how_many_segments_have_been_subbed = 0;
	const segments = pathSegments.map((pathseg)=>{
		if (pathseg.startsWith("{") && pathseg.endsWith("}")) {
			const subbed = substitutions[how_many_segments_have_been_subbed];
			if (subbed === undefined) {
				throw new Error(`Substitution for ${pathseg} is missing`);
			}
			how_many_segments_have_been_subbed += 1;
			return subbed;
		}
		return pathseg;
	});

	route = segments.join("/");

	// remove a trailing forward-slash if any
	if (route.endsWith("/")) {
		route = route.slice(0, -1);
	}
	const output = apiServerURLFragment + route;
	console.info(`API URL: ${output}`);
	return output;
};

// "End of File";