// test_title.js
const axios = require('axios');

const title = 'The Iliad'; // change as needed based on your booksdb.js

// Using Promises
function getBooksByTitle_Promise(title) {
    axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`)
        .then(response => {
            console.log(`Books with title "${title}" (Promises):\n`, response.data);
        })
        .catch(error => {
            console.error(`Error (Promises) fetching books with title "${title}":`, error.message);
        });
}

// Using Async/Await
async function getBooksByTitle_Async(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
        console.log(`Books with title "${title}" (Async/Await):\n`, response.data);
    } catch (error) {
        console.error(`Error (Async/Await) fetching books with title "${title}":`, error.message);
    }
}

getBooksByTitle_Promise(title);
getBooksByTitle_Async(title);
