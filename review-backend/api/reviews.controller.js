//our revies controller file
//this file is about getting info that was sent to the route and 
//sending it to the reviews DAO
//controller files are used to get info from the route and then do stuff with the info
//ReviewsDAO will access the databse

//ReviewsDAO - what we are going to use to access and make changes to our database
import ReviewsDAO from "../dao/reviewsDAO.js"



//exporting the ReviewsController, so that we can import it in other files
//a class is used in javascript to create multiple functions
//so we are creating the ReviewsController class so that we can create multiple functions for it
//we will call the functions in our routes file
export default class ReviewsController {








  //function to create reviews  
  static async apiPostReview(req, res, next) {
    try {//the results of the request will return a body in json format 
      const movieId = parseInt(req.body.movieId)//the json will have the movie id
      const review = req.body.review//the actual text of the user review
      const user = req.body.user//and the user who is creating the review
      console.log('movieid', movieId)

      //awaiting the result of ReviewsDAO.addReview
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      res.json({ status: "success" })//responding "success" in json format after successful movie creation/post operation
    } catch (e) {//exception handling for an unsuccessful request
      res.status(500).json({ error: e.message })
    }
  }












  //function to get return a review
  static async apiGetReview(req, res, next) {
    try {
      //getting the id  
      let id = req.params.id || {}//param /:id
      let review = await ReviewsDAO.getReview(id)//getting the review
      if (!review) {
        res.status(404).json({ error: "Not found" })//responding not found incase we don't get the review
        return
      }
      res.json(review)//if successful then we will recieve the review in json format
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }













  //updating a review
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id//accessing the review id
      const review = req.body.review//the review
      const user = req.body.user//the user 

      //update review, a function we will use to update reviews that we have to make/code
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )


      //handling exceptions and returning responses from mongoDB from errors occuring when attempting to update reviews
      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      //if modufied count is 0, this indicates that nothing has been changed
      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review",
        )
      }



      //responding "success" in json format after a successful review update/put operation
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })//exception handling
    }
  }















  //deleting a review
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id//getting the id parameter
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)//deleting the review
      res.json({ status: "success" })//responding "success" in json format after a successful review delete/delete operation
    } catch (e) {
      res.status(500).json({ error: e.message })//exception handling
    }
  }











  //function to getting a list of all reviews for a specific movie
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {}//the movie id
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)//getting the movie id
      if (!reviews) {
        res.status(404).json({ error: "Not found" })//returning a "not found" json if the movie is not found
        return
      }
      res.json(reviews)//returning the list of reviews for a successful get request
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }


  
}