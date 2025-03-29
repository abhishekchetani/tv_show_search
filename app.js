const form = document.querySelector("#searchForm");

const sendRequest = async query => {
	try {
		// Storing Query Parameter from Input in Separate Variable
		const config = { params: { q: query } };

		// API Request using Axios with 'CONFIG'
		const res = await axios.get("http://api.tvmaze.com/search/shows", config);

		// Passing Response Array to the Function
		displayShows(res.data);
	} catch (e) {
		console.log("NO RESPONSE FROM SERVER - ", e);
	}
};

// Checking for form submit event
form.addEventListener("submit", e => {
	e.preventDefault();

	// Checking 'form' directory for input value
	// console.dir(form);

	// Capturing Form Input Value By User
	const searchTerm = form.elements.query.value;
	sendRequest(searchTerm);

	// Resetting Search Input after every Search
	form.elements.query.value = "";
	// Removing Previous Search Results
	const prevResults = document.querySelectorAll(".show");
	removePrevResults(prevResults);

	// try {
	// 	// Requesting from API with String Template Literal
	// 	const res = await axios.get(
	// 		`http://api.tvmaze.com/search/shows?q=${searchTerm}`
	// 	);
	// 	console.log(res.data); // Returns an array of objects

	// 	// Getting The Image URL Of First Show From Response
	// 	console.log(res.data[0].show.image.medium);

	// } catch (e) {
	// 	// Handling Error in case of No Response
	// 	console.log("NO RESPONSE FROM SERVER - ", e);
	// }
});

// Selecting the Container
const imageContainer = document.querySelector("#container");
// Function to Display Search Results
const displayShows = shows => {
	try {
		for (let result of shows) {
			// If Enough Data Exists For A Show, Then Append It To Webpage
			if (result.show.image && result.show.network) {
				const show = document.createElement("div");
				// Adding .show class to newly created 'div'
				show.classList.add("show");

				const showLink = document.createElement("a");
				const showImg = document.createElement("img");

				// Setting Image Source
				showImg.src = result.show.image.medium;
				// Adding .image class to every 'img'
				showImg.classList.add("image");

				// Setting Image Link to Official Site
				showLink.href = result.show.officialSite;
				// Setting Image Target to Open In New Tab
				showLink.target = "_blank";

				// Appending 'img' to 'a' & 'a' to 'div'
				showLink.appendChild(showImg);
				show.appendChild(showLink);

				// Displaying the Show Name under the Image
				const showName = document.createElement("h3");
				showName.innerText = result.show.name;
				show.appendChild(showName);

				// Available Source/Channel for every Result
				const network = document.createElement("span");
				network.append(` - ${result.show.network.name}`);
				// Inserting 'span' after 'h3' element
				showName.insertAdjacentElement("afterend", network);

				// Appending everything to the Main Container
				imageContainer.appendChild(show);
			}
		}
	} catch (e) {
		console.log("DATA NOT AVAILABLE - ", e);
	}
};

// Removing Show Images On Next Show Search
const removePrevResults = shows => {
	for (let result of shows) {
		// result.parentElement.removeChild(result);
		result.remove();
	}
};
