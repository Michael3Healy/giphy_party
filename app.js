const form = document.querySelector('form');
const input = document.querySelector('input');
const list = document.querySelector('#gifList');
const removeButton = document.querySelector('#remove');
const termsTracker = {};

// Offset search results by 1 for each time the same search term is used
const tracker = (searchTerm) => {
    if (termsTracker[searchTerm]) {
        termsTracker[searchTerm] += 1;
    } else {
        termsTracker[searchTerm] = 1;
    }
    const count = termsTracker[searchTerm];
    return count;
}

form.addEventListener('submit', async e => {
	e.preventDefault();
    const count = tracker(input.value);
    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {params: {q: input.value, api_key: 'KJQKXSaWMZmAD6Zd9SQigZC6XEpVx6LM'}})
    addGif(response.data.data[count].images.original.url);
});

const addGif = async (src) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('img-fluid');
    img.classList.add('m-2');
    img.classList.add('align-self-center');
    list.append(img);
}

removeButton.addEventListener('click', () => {
    list.innerHTML = '';
    termsTracker = {};
})