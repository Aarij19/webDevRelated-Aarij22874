const db = require("mongoose");

const userSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        // min: 3,
        // max: 30
    },
    email: {
        type: String,
        required: true,
        // max: 50,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        // min: 6,
        // max: 30
    }
}, {timestamps: true});         //this will automatically create createdAt and updatedAt fields in the database

module.exports = db.model("User", userSchema);  //this will create a collection named users in the database

//schemas helps us to define the structure of the documents that we can store inside the collection