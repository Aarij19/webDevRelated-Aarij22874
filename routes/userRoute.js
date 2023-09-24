//hi
const express = require('express');
const { signup, login } = require('../controllers/userController'); //this is how we import the functions from the userController.js file
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

module.exports = userRouter;//this way we can access this in other files