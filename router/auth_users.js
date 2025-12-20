const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "user1", "password": "password1"}];

const isValid = (username)=>{
	let userValidation = users.filter((user) =>{
	return user.username === username
	})
	return userValidation.length  > 0 ? false : true;
}
const authenticatedUser = (username,password)=>{
	let userAuthenticated = users.filter((user) => {
	return user.username === username && user.password === password;
	})
	return userAuthenticated.length > 0 ? true : false;
}

regd_users.post("/login", (req,res) => {
 	const  {username, password} = req.body

	if(!username || !password){
		return res.status(401).json({message: "Error logging in"})
	}
	if (authenticatedUser(username, password)){
	let accessToken = jwt.sign({username}, "access", {expiresIn: 60})

	req.session.authorization = {
		accessToken, username
	}
	return res.send("Welcome back "+ username);
	}
	else {
		return res.status(401).json({message: "User Invalid. Check Username and Password"})
	}
});

regd_users.put("/auth/review/:isbn", (req, res) => {
 	const  isbn  = req.params.isbn
	const review = req.query.review
	const username = req.session.authorization?.username;

	if (!username){
		return res.status(401).json({message: "User not authenticated, go to login"})
	}
	if (!review){
		return res.status(400).json({message: "Review is required"})
	}
	if (books[isbn]){
		books[isbn].reviews[username] = review;
		return res.status(200).json({message:`Review added successfully for ISBN ${isbn} by user ${username}`})
	}
 	return res.status(404).json({message: "Failed to add"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
 	const  isbn  = req.params.isbn
	const username = req.session.authorization?.username;

	if (!username){
		return res.status(401).json({message: "User not authenticated, go to login"})
	}
	if (books[isbn] && books[isbn].reviews[username]){
		delete books[isbn].reviews[username];
		return res.status(200).json({message:`Review deleted successfully for ISBN ${isbn} by user ${username}`})
	}
 	return res.status(404).json({message: "Failed to delete review"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
