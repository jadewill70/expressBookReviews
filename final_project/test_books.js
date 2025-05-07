// test_books.js
const axios = require('axios');

// Using Promises
function getBooksWithPromises() {
    axios.get('http://localhost:5000/')
        .then(response => {
            console.log("Books retrieved using Promises:\n", response.data);
        })
        .catch(error => {
            console.error("Error fetching books with Promises:", error.message);
        });
}

// Using Async/Await
async function getBooksWithAsync() {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("Books retrieved using Async/Await:\n", response.data);
    } catch (error) {
        console.error("Error fetching books with Async/Await:", error.message);
    }
}

getBooksWithPromises();
getBooksWithAsync();
