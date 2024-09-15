//Our main databse code
/*inally test api by running your server and entering this in your terminal: curl -X POST
https://localhost:8000/api/v1/reviews/new -H "Content-Type: application
/json" -d '{movieId": 23, "user": blessing, "review": "great"}'*/

//curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d '{"movieId": 23, "user": "blessing", "review": "great"}'



//connecting to the db and starting the server 
import app from "./server.js";
import mongodb from "mongodb";//this will help us use functions created by mongo to enable use to operate with the database
import ReviewsDAO from "./dao/reviewsDAO.js";//here is the problem
//DAO - Data Access Object



//creating some variables 

//using this to connect to our databse
const MongoClient = mongodb.MongoClient;

//username and password, later we need to make environment variables to hide the usernames and passwords
const mongo_username = "blessingt2756";
const mongo_password = "studentBlessing";
//our connection string - mongodb+srv://blessingt2756:<db_password>@cluster0.gx4dh.mongodb.net/
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.gx4dh.mongodb.net/`;//using the `` backslash characters aroung strings in js enables us to insert variables within our strings

//our port, we will be running our server on a specific port 
//we will be running our server on port 8000, however there are other common ports to use for different things
const port = 8000;







//connecting to our db 
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,//limit to num of connected people
        wtimeoutMS: 2500,//2500ms how long to try and connect to db before timing out
        useNewUrlParser: true//just has to be done
        //in future once the MongoDB Node.js driver is updated 
    }
)
.catch(err =>{
    console.error(err.stack);//sending an error message of the exception to our console
    process.exit(1);//terminates the program
})//exception handling for cases of failed connections
//connect to the db, then...
.then(async client => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`) //use this address in your web to see the response from the server: http://localhost:8000/ or http://localhost:8000/api/v1/reviews
    })//command to start your server
})//an async function is a function that runs while other things are running



//continue with this on the following clip at 6:45:54 -> https://www.youtube.com/watch?v=nu_pCVPKzTk



