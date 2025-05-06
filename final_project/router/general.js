const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //TASK 6
    const { username, password } = req.body;

    // 1) Check that both fields were provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
  
    // 2) Check if username already exists
    if (users.find(u => u.username === username)) {
      return res
        .status(409)
        .json({ message: "Username already exists" });
    }
  
    // 3) Otherwise register the new user
    users.push({ username, password });
    return res
      .status(201)
      .json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here TASK 1
   return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here TASK 2
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here TASK 3
  const authorQuery = req.params.author.toLowerCase();       
  const allIsbns    = Object.keys(books);                    
  const matched     = [];                                    

  allIsbns.forEach((isbn) => {
    const book = books[isbn];
    if (book.author.toLowerCase() === authorQuery) {
      matched.push(book);
    }
  });

  if (matched.length > 0) {
    // 4) pretty-print the array of matches
    return res
      .status(200)
      .send(JSON.stringify(matched, null, 4));
  } else {
    return res
      .status(404)
      .json({ message: "No books found for that author" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here TASK 4
  const titleQuery = req.params.title.toLowerCase();    // grab & normalize
  const allIsbns   = Object.keys(books);                // get every ISBN key
  const matched    = [];                                // array to collect matches

  allIsbns.forEach(isbn => {
    const book = books[isbn];
    if (book.title.toLowerCase() === titleQuery) {
      matched.push(book);
    }
  });

  if (matched.length > 0) {
    return res
      .status(200)
      .send(JSON.stringify(matched, null, 4));          // pretty-print matches
  } else {
    return res
      .status(404)
      .json({ message: "No books found with that title" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here TASK 5
  const isbn = req.params.isbn;

  if (books[isbn]) {
    // send back only the reviews object
    return res
      .status(200)
      .json(books[isbn].reviews);
  } else {
    return res
      .status(404)
      .json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
