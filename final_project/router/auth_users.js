const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

// In-memory store of users
let users = [];

// Check if username is already taken
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// Authenticate user credentials
const authenticatedUser = (username, password) => {
  return users.find((user) => user.username === username && user.password === password);
};

// LOGIN route
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = authenticatedUser(username, password);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  let accessToken = jwt.sign({ username: username }, "access", { expiresIn: '1h' });
  req.session.authorization = {
    accessToken
  };

  return res.status(200).json({ message: "User successfully logged in", accessToken });
});

// REVIEW route (only accessible when logged in)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;

  if (!review) {
    return res.status(400).json({ message: "Review cannot be empty" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Get the username from the JWT token (already validated in middleware)
  const username = req.user?.username;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({ message: "Review added/updated successfully", reviews: books[isbn].reviews });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if a review by this user exists
    if (books[isbn].reviews && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username]; // Remove the review
        return res.status(200).json({ message: "Review deleted successfully" });
    } else {
        return res.status(404).json({ message: "No review found for this user to delete" });
    }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
