import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { usePathname } from "next/navigation";


const CommentSection = () => {
  const [reviews, setReviews] = useState([]);
  const pathname= usePathname()

  const id=pathname.split("/").pop()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reviews/${id}`); // Adjust the endpoint URL according to your backend setup
        setReviews(response.data);
        console.log("reviews::::::",response.data)
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // console.log("tttttttttt   ",reviews[0].user)

  return (
    <Stack direction="column" spacing={1} id="Reviews">
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", margin: "10px 15px" }}
      >
        Reviews ({reviews.length})
      </Typography>
      <Divider
        sx={{
          paddingBlock: 0.5,
          backgroundColor: "#eeeee4",
          borderColor: "transparent",
          mt: 0,
        }}
      />
      <Stack direction="column" spacing={1} >
        {reviews
          .slice(0)
          .reverse()
          .map((review: any) => (
            <Card key={review.id}>
              <CardHeader
                avatar={<Avatar src={review.user.profile_image} />}
                title={review.user.name}
                subheader={review.created_at.split("T")[0]}
                sx={{ paddingTop: 4 }}
              />
              <CardContent sx={{ paddingTop: 0, paddingLeft: 4 }}>
                <Typography variant="body1" gutterBottom>
                  {review.comment}
                </Typography>
                <Rating name="rating" value={review.rating} readOnly />
              </CardContent>
            </Card>
          ))}
      </Stack>
    </Stack>
  );
};

export default CommentSection;
