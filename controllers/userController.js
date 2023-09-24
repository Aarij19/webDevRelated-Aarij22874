const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "test"; //this is the secret key that we will use to encrypt our jwt token  //we can also use process.env.SECRET_KEY to store the secret key in the environment variables

const signup = async (req, res) => {    //async because db operations are asynchronous as it takes time to connect to the database

    //STEPS TO PERFORM AS ILLUSTRATED IN THE TUTORIAL BY OUR TA:
    //step01: acquire the user input and validate the user input, check whether the user already exists or not.
    //step02: Encrypt users password using bcrypt library.
    //step03: user creation/registration in the database.
    //step04: generate a signed jwt token.

    const {name, email, password} = req.body; //acquiring the user input (we have 3 properties in the user model, so we are acquiring all 3 of them)
    try{

        //Step01 - existing user check done below:
        const existingUser = await userModel.findOne({email: email}); //checking whether the user already exists or not
        if(existingUser){
            return res.status(400).json({message: "User already exists"});  //400 status is a bad request status called when we create a user that already exists
        }

        //Step02 - password encryption done below:
        const encryptedPassword = await bcrypt.hash(password, 10); //10 is the salt value, the higher the salt value, the more secure the password is. rounds of hashing how much it will be encrypted. 10 is the standard value.
        
        //Step03 - user creation done below:
        const result = await userModel.create({name: name, email: email, password: encryptedPassword}); //creating a new user in the database

        //Step04 - jwt token generation done below:
        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY );   //"test", {expiresIn: "1h"}//1h means 1 hour, this token will expire in 1 hour
        res.status(201).json({user: result, token: token}); //201 status is a created status called when we create a user successfully  //we are sending the token back to the frontend so that the user can stay logged in for 1 hour


    }
    catch (error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"}); //500 status is an internal server error status

    }


}

const login = async (req, res) => {

}
module.exports = {signup,login};