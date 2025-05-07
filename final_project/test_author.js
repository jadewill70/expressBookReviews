// test_author.js
const axios = require('axios');

const author = 'Chinua Achebe'; // use an actual author name from booksdb.js

// Using Promises
function getBooksByAuthor_Promise(author) {
    axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`)
        .then(response => {
            console.log(`Books by "${author}" (Promises):\n`, response.data);
        })
        .catch(error => {
            console.error(`Error (Promises) fetching books by "${author}":`, error.message);
        });
}

// Using Async/Await
async function getBooksByAuthor_Async(author) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
        console.log(`Books by "${author}" (Async/Await):\n`, response.data);
    } catch (error) {
        console.error(`Error (Async/Await) fetching books by "${author}":`, error.message);
    }
}

getBooksByAuthor_Promise(author);
getBooksByAuthor_Async(author);
