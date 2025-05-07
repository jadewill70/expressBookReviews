// test_isbn.js
const axios = require('axios');

const isbn = '1'; // change this to a valid ISBN from your booksdb.js

// Using Promises
function getBookByISBN_Promise(isbn) {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            console.log(`Book ${isbn} retrieved using Promises:\n`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching book ${isbn} with Promises:`, error.message);
        });
}

// Using Async/Await
async function getBookByISBN_Async(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log(`Book ${isbn} retrieved using Async/Await:\n`, response.data);
    } catch (error) {
        console.error(`Error fetching book ${isbn} with Async/Await:`, error.message);
    }
}

getBookByISBN_Promise(isbn);
getBookByISBN_Async(isbn);
