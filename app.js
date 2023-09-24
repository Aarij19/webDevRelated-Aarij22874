const express = require("express");
const app = express();
const db = require("mongoose");
const userRouter = require("./routes/userRoute");



app.use(express.json()); //this is used to parse the incoming request body into json format
app.use("/user", userRouter); //this is how we use the userRoute.js file

// console.log("Hello Aarij, how u doing?");

// app.listen(3000, ()=>{
//     console.log("Listening on port 3000");
// });


app.get("/", (req, res)=>{
    res.status(200).send("<h1><i>Hello There, Welcome back to basics, Mr. Aarij!</i></h1>");
});

db.connect("mongodb+srv://muhammadaarij007:aarij@cluster0.gtz6feo.mongodb.net/").then(() => {app.listen(5000, ()=>{console.log("server started on port no. 5000")})})//console.log("DB is successfully connected"))
.catch((error)=>{console.log(error)});
// app.get("/aaruu", (req, res)=>{
//     res.send("Hello I am aaruu");
// });

// app.use((req, res)=>{
//     res.send("Ghalat agayee ho bhaiii");
// });
