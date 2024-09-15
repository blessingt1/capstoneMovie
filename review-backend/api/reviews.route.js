//creating our route
import express from "express"

//importing our controller file, this file which will tell what to do when going to another route
import ReviewsCtrl from "./reviews.controller.js"

//creating the actual route
const router = express.Router();//this will route user requests to different parts of our application

//sameple to a route with a get request that returns hello world
//router.route("/").get((req,res) => res.send("hello world"))


//id: this creates a variable for our movie id
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)//calling the apiGetReviews function to make a get request and return all the reviews attached to a sepecific movie
router.route("/new").post(ReviewsCtrl.apiPostReview)//calling the apiPostReview function to make a post request and create a new review
router.route("/:id")//review id
    .get(ReviewsCtrl.apiGetReview)//call this function for get requests
    .put(ReviewsCtrl.apiUpdateReview)//this one for put requests
    .delete(ReviewsCtrl.apiDeleteReview)//for delete requests






//exporting the route so that we can import it in other files
export default router