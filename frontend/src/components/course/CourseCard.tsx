import Rating from "@mui/material/Rating";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Course } from "@/utils/courseInterface";

const CourseCard: React.FC<{ course: Course }> = ({ course }: any) => {
  const router = useRouter();

  const handleCouseDetail = (id: number) => {
    router.push(`/courseDetail/${id}`);
  };
  return (
    <div
      className="w-[300px] rounded-xl border "
      onClick={() => handleCouseDetail(course.id)}
    >
      <img
        src={`http://res.cloudinary.com/dgdumobsz/${course.thumbnail}`}
        alt={course.title}
        className="h-[200px] w-full rounded-t-xl object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{course.title}</h1>
        <p className="mt-3 text-sm text-gray-600">{course.short_description}</p>
        <p className="mt-3 text-sm text-gray-600">{course.created_by}</p>
        <p className="flex justify-center mt-3 text-sm text-gray-600">
          <span className="mr-2 mt-1 font-semibold">{course.rating}</span>
          <Rating defaultValue={course.rating} precision={0.1} readOnly />
        </p>

        <span className="text-sm font-semibold">
          <CurrencyRupeeIcon
            style={{ height: "19px", marginTop: "-3px", marginRight: "-3px" }}
          />
          {course.price}
          <button
            type="button"
            className="mt-4 ml-10 rounded-md bg-purple-600 px-6 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => handleCouseDetail(course.id)}
          >
            Read
          </button>
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
