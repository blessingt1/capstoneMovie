//connecting to mongo db

//using js mongo db library to access mongo db
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID//accessing object id from mongo db
//we are going to send and receive data from our backend to our database
//we will have a string that we will equate to our object Id so that the object id can be searched for in our database


//creating a variable called reviews
let reviews//this is where we will assign our connection to our database



//exporting the class ReviewsDAO so that we can ipmort it in other classes
export default class ReviewsDAO {//making the class static so that we don't have to instantiate the class when we call the function 
  static async injectDB(conn) {
    if (reviews) {
      return//don't inject/do anything if there's already a db connection
    }
    try {//try connecting/this if there is no db connection
      reviews = await conn.db("reviews").collection("reviews")//connecting to the reviews db and then get the collection called review watch this video at 6:33:33 -> https://www.youtube.com/watch?v=nu_pCVPKzTk
    } catch (e) {//handling the exception of a failed db connection
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }



  //add review function
  static async addReview(movieId, user, review) {
    try {
      //creating our document
      const reviewDoc = {//our database entry as a js object
        movieId: movieId,
        user: user,
        review: review,
      }
      console.log("adding")
      //insertOne is a mongo db function we use to insert into the database
      return await reviews.insertOne(reviewDoc)//returning the reviewDoc we inserted
    } catch (e) {//exception handling for a failed review insertion
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }








  //get review function
  static async getReview(reviewId) {
    try {
      //findOne function to find a record from a mongo db
      //we want to find the review id 
      return await reviews.findOne({ _id: ObjectId(reviewId) })//casting the reviewId string into an ObjectId
    } catch (e) {//exception handling incase the review does not exist in our database
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }










  //update review function
  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },//finding the review using the reviewId
        { $set: { user: user, review: review } }//updating/setting the review
      )

      return updateResponse//returning the update response that we get
    } catch (e) {//exception handling incase the review cannot be updated
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }














  //delete review function
  static async deleteReview(reviewId) {

    try {
      const deleteResponse = await reviews.deleteOne({//deleting the review
        _id: ObjectId(reviewId),//searching for what we will delete by using the review id
      })

      return deleteResponse
    } catch (e) {//exception handling for inability to deleting a review
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }




  //get the lis of reviews for a specific movie 
  static async getReviewsByMovieId(movieId) {
    try {
      //finding multiple items returns a cursor that is why we use cursor
      //cursor - list of all the documents
      const cursor = await reviews.find({ movieId: parseInt(movieId) })//looking for the reviews
      return cursor.toArray()//converting the cursor to an array
    } catch (e) {//exception handling for inability of getting the reviews of a specific movie
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

}