const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Capturing Form Input Value By User
    const searchTerm = form.elements.query.value;
    // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    // console.log(res.data);
    // Getting The Image URL Of First Show From Response
    // console.log(res.data[0].show.image.medium);
    try {
        const config = { params: { q: searchTerm } };
        const res = await axios.get("http://api.tvmaze.com/search/shows", config);
        makeImages(res.data);
        // Resetting Search Input
        form.elements.query.value = "";
    } catch (e) {
        console.log("NO RESPONSE FROM SERVER - ", e);
    }
})

const imageContainer = document.querySelector('#container');
const makeImages = (shows) => {
    try {
        for (let result of shows) {
            // console.log(show);
            // If Image Exists For A Show, Append It To Webpage
            if (result.show.image && result.show.name && result.show.webChannel && result.show.officialSite) {
                const show = document.createElement('div');
                show.classList.add('show');

                const img = document.createElement('img');
                // Setting Image Source & Link To Official Site
                img.src = result.show.image.medium;
                img.setAttribute('href', result.show.officialSite);
                img.classList.add('image');
                show.appendChild(img);

                const showName = document.createElement('h3');
                showName.innerText = result.show.name;
                show.appendChild(showName);

                const channel = document.createElement('span');
                channel.append(` - ${result.show.webChannel.name}`);
                showName.insertAdjacentElement('afterend', channel);

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