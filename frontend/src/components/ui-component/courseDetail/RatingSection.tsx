import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Rating } from "@mui/material";

function RatingSection() {
  const [reviews, setReviews] = useState([]);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  const getStarPercentage = (star: number) => {
    const totalReviews = reviews.length;
    const starReviews = reviews.filter(
      (review: any) => Number(review.rating) === star
    ).length;
    return totalReviews > 0
      ? ((starReviews / totalReviews) * 100).toFixed(0)
      : 0;
  };

  const starPercentages = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => ({
      star: star,
      percentage: getStarPercentage(star),
    }));
  }, [reviews]);

  return (
    <div>
      <div className="flex items-center mb-2">
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2 font-semibold">
            {/* Calculate average rating */}
            {reviews.reduce(
              (acc, review: any) => acc + parseFloat(review.rating),
              0
            ) / reviews.length || 0}
          </span>
          <Rating
            value={
              reviews.reduce(
                (acc, review: any) => acc + parseFloat(review.rating),
                0
              ) / reviews.length
            }
            precision={0.1}
            readOnly
            className="text-yellow-500"
          />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {reviews.length} global ratings
      </p>
      {starPercentages.map(({ star, percentage }, index) => (
        <div className="flex items-center mt-4" key={index}>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {star} star
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <div
              className="h-5 bg-yellow-300 rounded"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default RatingSection;
