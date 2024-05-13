"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import Rating from "@mui/material/Rating";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../store/slice/courseSlice";
import { CourseDetailInterface } from "@/utils/courseInterface";
import CloudinaryVideo from "cloudinary-video-player";
import RatingSection from "../ui-component/courseDetail/RatingSection";
import CommentSection from "../ui-component/courseDetail/CommentSection";

import AddToCart from "./AddToCart";
import ReviewComponent from "./ReviewComponent";
import { Modal } from "@mui/material";
import { getUserProfile } from "@/store/slice/authSlice";

const CourseDetail = ({ id }: { id: number }) => {
  const router = useRouter();
  const courses = useSelector((state: any) => state.course.courses);
  const [course, setCourse] = useState<CourseDetailInterface>({});
  const [showReviewModal, setShowReviewModal] = useState(true);
  const payments = useSelector(
      (state: any) => state.payments?.payments || []
    );
  const user = useSelector((state: any) => state.user.userProfile)
  
  const isCoursePurchased = payments.some(
    (item: any) => Number(item.course) == id
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await dispatch(getCourse(id));
        // console.log(data);
        const courseData = data.payload;
        setCourse({ ...courseData });
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, []);

const handleWatchClick = (videoUrl: string) => {
  const videoElement = document.createElement("video");
  videoElement.src = videoUrl;
  videoElement.controls = true;

  const playerContainer = document.querySelector("#my-player-id");
  if (playerContainer) {
    playerContainer.innerHTML = "";
    playerContainer.appendChild(videoElement);
  }
};

  // const handleClick = () => {
  //   router.push(`${course.video_url}`);
  // };
  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto lg:flex lg:items-start lg:justify-center">
          
          {/* Image Section */}
          <div className="lg:w-1/2 top-0">
            <div id="my-player-id">
              <img
                src={`http://res.cloudinary.com/dgdumobsz/${course.thumbnail}`}
                alt={course.title}
                className="h-[400px] w-full object-cover rounded-lg shadow-md "
                onClick={() => handleWatchClick(`${course.video_url}`)}
              />
            </div>

            {/* Lesson Section */}
            <div className=" mt-5 mb-3">
              <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  dark:bg-purple-600 dark:text-white-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-tl-lg">
                      Lessons
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-tr-lg">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {course.lessons && course.lessons.length > 0 ? (
                    course.lessons.map((lesson) => (
                      <tr
                        key={lesson.id}
                        className="text-gray-900 bg-white dark:bg-white-800"
                      >
                        <td className="px-6 py-4 font-medium">
                          {lesson.title}
                        </td>
                        <td className="px-6 py-4">{lesson.duration}</td>
                        <td className="px-6 py-4">
                          {isCoursePurchased ? (
                            <button
                              onClick={() => handleWatchClick(lesson.video_url)}
                              className="text-blue-700"
                            >
                              Watch
                            </button>
                          ) : (
                            <button
                              className="text-gray-500"
                              onClick={() => handleWatchClick(lesson.video_url)}
                              // disabled
                            >
                              Watch
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-6 py-4">No lessons available</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900 dark:text-dark">
                    <th scope="row" className="px-6 py-3 text-base">
                      Total Lessons:{" "}
                      {course.lessons ? course.lessons.length : 0}
                    </th>

                    <td className="px-6 py-3">
                      {" "}
                      {course.lessons
                        ? course.lessons.reduce(
                            (total, lesson) => total + lesson.duration,
                            0
                          )
                        : 0}{" "}
                      Minutes
                    </td>
                    <td className="px-6 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="lg:w-1/2 lg:pl-12">
            <h1 className="text-gray-900 text-3xl font-medium mb-1">
              {course.title}
            </h1>
            <h1 className="text-gray-700 text-1xl font-medium mb-2">
              {course.created_by}{" "}
              <span className="text-gray-500 ml-3 text-sm">
                {course.updated_at?.split("T")[0]}
              </span>
            </h1>
            <div className="flex items-center mb-2">
              <span className="text-gray-600 mr-2 font-semibold">
                {course.rating}
              </span>
              <Rating
                value={parseFloat(course.rating || "0")}
                precision={0.1}
                readOnly
                className="text-yellow-500"
              />
            </div>
            <h2 className="text-sm">
              {" "}
              {course.level} level and {course.requirements} is required
            </h2>

            <br />
            <hr />

            <div className="mb-3">
              <h1 className="text-gray-900 text-1xl font-semibold">
                Course Description:
              </h1>
              {course.description ? (
                <ul className="list-disc pl-6">
                  {course.description.split(".").map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                  ))}
                </ul>
              ) : (
                <p>No description available</p>
              )}
            </div>

            <div className="flex items-center mb-0">
              <span className="text-2xl font-medium text-gray-900">
                <CurrencyRupeeIcon className="inline-block" /> {course.price}
              </span>
              <AddToCart id={id} />
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 mx-auto mb-8 ">
            <RatingSection />
        </div>{" "}
        <div className="container mx-auto mb-8 ">
            <ReviewComponent course={course.id} user={user.id}/>
        </div>
        <div className="container px-5 mx-auto mb-8 ">
            <CommentSection/>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
