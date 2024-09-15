//Our main server code



//creating our backend server 


/*we will be using express, which is a fast and
lightweight web framework for node js and it makes
it easier to make http endpoints that we can use
for our web server and we will also use cors which
- cross origin resource sharing which allows a 
js request to skip the same origin policy and 
access recources from remote hosts, meaning it 
prevents errors from accessing database from another
host to our host which is our server.*/



import express from "express"//modules for the server
import cors from "cors"//cross origin resource sharing
import reviews from "./api/reviews.route.js"

//variable where we will load our server into
//and will use to create our web server
const app = express();

//app.use enables use to use middleware - programs that express uses to change how things work
//
app.use(cors());

//enables our server to accept/read json from request
//enables us to send and recieve json
app.use(express.json());



//defining our initial routes
//initial routes - the url that we access to get to send and receive information
app.use("/api/v1/reviews", reviews); //v1 idicates version 1/first version of our api, best practice indicates that we should use vi to indicate the version incase we make new versions in future
//for this url: "/api/v1/reviews", we are going to use this route: reviews


//creating a backup route, just incase the user tries to reach a route that doesn't exist
app.use("*", (req, res) => res.status(404).json({error: "not found"}));
//req - request, res - response


//exporting our app as a module 
//this will allow us to import app in the file that accesses the databse
//which will be the file that we will run to get the server running
//we export so that we can import programs into other files and use them
export default app;




