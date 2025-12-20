const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const  {username, password} = req.body

  if (username && password){
    if (isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

public_users.get("/", async function (req, res) {
  try{
    const data = await Promise.resolve(books);
    return res.status(200).json(data)
  } catch (error){
    return res.status(500).json({message: "Error retrieving book list", error: error.message});
  }
  }
);

public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try{
    const data = await Promise.resolve(books[isbn]);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({message: "Book not found for ISBN " + isbn});
    }
  } catch (error){
    return res.status(500).json({message: "Error retrieving book details", error: error.message});
  }
});

public_users.get('/author/:author',async function (req, res) {
  try{
    const author = req.params.author;
    let authorBooks = [];
    for (let isbn in books) {
      if (books[isbn]["author"] === author) {
        authorBooks.push(books[isbn]);
      }
    }
    if (authorBooks.length > 0){
      return res.status(200).json(authorBooks);
    } else {
      return res.status(404).json({message: "No books found for the author "+ author});
    }
  } catch (error){
    return res.status(500).json({message: "Error retrieving books by author", error: error.message});
  }
});

public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const allBooks = await Promise.resolve(books);
    for (let isbn in allBooks) {
      if (allBooks[isbn]["title"] === title) {
        return res.status(200).json(allBooks[isbn]);
      }
    }
    return res.status(404).json({message: "No book found with the title " + title});
  } catch (error) {
    return res.status(500).json({message: "Error retrieving book by title", error: error.message});
  }
});

public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]["reviews"]);
  } else {
    return res.status(404).json({message: "Book not found for ISBN " + isbn});
  }
});

module.exports.general = public_users;
