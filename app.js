const form = document.querySelector('#searchForm');

// Checking for form submit event
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Checking 'form' directory for input value
    console.dir(form);
    // Capturing Form Input Value By User
    const searchTerm = form.elements.query.value;

    // Requesting from API with String Template Literal
    // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    // console.log(res.data);
    // Getting The Image URL Of First Show From Response
    // console.log(res.data[0].show.image.medium);

    try {
        // Setting Query Parameter from Input in an Object
        const config = { params: { q: searchTerm } };
        // API Request using Axios with Object
        const res = await axios.get("http://api.tvmaze.com/search/shows", config);
        // Passing Response Data to the Function
        makeImages(res.data);
        // Resetting Search Input after every Search
        form.elements.query.value = "";
    } catch (e) {
        // Handling Error in case of No Response
        console.log("NO RESPONSE FROM SERVER - ", e);
    }
})

// Selecting the Container
const imageContainer = document.querySelector('#container');
// Function to Display Search Results
const makeImages = (shows) => {
    try {
        for (let result of shows) {
            console.log(result);            // checking the received response in function call

            // If Image Exists For A Show, Then Append It To Webpage
            if (result.show.image && result.show.name && result.show.webChannel && result.show.officialSite) {
                const show = document.createElement('div');
                // Adding .show class to newly created 'div'
                show.classList.add('show');

                const img = document.createElement('img');
                // Setting Image Source & It's Link To Official Site
                img.src = result.show.image.medium;
                img.setAttribute('href', result.show.officialSite);
                // Adding .image class to every 'img'
                img.classList.add('image');
                // Appending 'img' to the 'div' element
                show.appendChild(img);

                // Displaying the Show Name under the Image
                const showName = document.createElement('h3');
                showName.innerText = result.show.name;
                show.appendChild(showName);

                // Available Source/Channel for every Result
                const channel = document.createElement('span');
                channel.append(` - ${result.show.webChannel.name}`);
                // Inserting 'span' after 'h3' element
                showName.insertAdjacentElement('afterend', channel);

                // Appending everything to the Main Container
                imageContainer.appendChild(show);

                // removeImages(img);
            }
        }
    } catch (e) {
        console.log("DATA NOT AVAILABLE - ", e);
    }
}

// Function For Removing Show Images On Next Show Search
const removeImages = (images) => {
    for (let image of images) {
        image.parentElement.removeChild(image);
    }
}