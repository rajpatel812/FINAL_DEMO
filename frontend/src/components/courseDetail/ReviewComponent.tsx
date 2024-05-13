import React from "react";
import { Box, Typography, Rating, Button, TextField } from "@mui/material";
import { useState } from "react";
import {toast} from "react-hot-toast";
import axios from "axios";


function ReviewComponent({ course, user }: { course: any; user: any }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewStatus, setReviewStatus] = useState(false);

  const handleReviewSubmit = async () => {
    const data = {
      rating: rating,
      comment: reviewText,
      courseId: course,
      userId: user,
    };

    try {
      if (data.rating !== 0 && data.comment !== "") {
        await axios.post(
          "http://127.0.0.1:8000/reviews/",
          {
            user: data.userId,
            course: data.courseId,
            comment: data.comment,
            rating: data.rating,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Review Created Successfully");
        setReviewStatus(true);
      }
      else {
        toast.error("Review is empty or Something went wrong");
      }
    } catch (err: any) {
      if (err.data?.non_field_errors) {
        toast.error("You Have already given a Review");
      } else if (!user) {
        toast.error("Sign In to Create Review");
      } else {
        toast.error("Review Creation Failed");
      }
    }
    setReviewText("");
    setRating(0);
  };

  return (
    <>
      
      <Box sx={{ p: "16px 24px" }} id="WriteReview">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Write a Review
        </Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue: any) => setRating(newValue)}
          size="large"
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          id="review-text"
          label="Your Review"
          variant="outlined"
          fullWidth
          multiline
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleReviewSubmit}
        >
          Submit Review
        </button>
      </Box>
    </>
  );
}

export default ReviewComponent;
