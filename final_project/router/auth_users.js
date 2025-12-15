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

//only registered users can login
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

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
