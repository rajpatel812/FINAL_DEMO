import { useState, useEffect } from "react";
import { getAllCourses } from "../../store/slice/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Course } from "@/utils/courseInterface";
import CourseCard from "./CourseCard";
import Pagination from "../ui-component/Pagination";

const CoursesList = () => {
  const courses = useSelector((state: any) => state.course.courses);
  const isAllCourses = useSelector((state: any) => state.course.isAllCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCourses() {
      try {
        await dispatch(getAllCourses());
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, [isAllCourses]);

  const [bestCurrentPage, setBestCurrentPage] = useState(1);
  const [allCurrentPage, setAllCurrentPage] = useState(1);
  const coursesPerPage = 4;

  // Sort best courses by highest rating
  const bestCourses = courses
    .filter((course: Course) => Number(course.rating) >= 4)
    .sort((a: Course, b: Course) => b.rating - a.rating);

  const allCourses = courses;

  const bestIndexOfLastCourse = bestCurrentPage * coursesPerPage;
  const bestIndexOfFirstCourse = bestIndexOfLastCourse - coursesPerPage;
  const currentBestCourses = bestCourses.slice(
    bestIndexOfFirstCourse,
    bestIndexOfLastCourse
  );

  // console.log("currentBestCourses: " + currentBestCourses)

  const allIndexOfLastCourse = allCurrentPage * coursesPerPage;
  const allIndexOfFirstCourse = allIndexOfLastCourse - coursesPerPage;
  const currentAllCourses = allCourses.slice(
    allIndexOfFirstCourse,
    allIndexOfLastCourse
  );

  const bestTotalPages = Math.ceil(bestCourses.length / coursesPerPage);
  const allTotalPages = Math.ceil(allCourses.length / coursesPerPage);

  const handleBestPaginate = (pageNumber: number) => {
    if (pageNumber < 1) {
      setBestCurrentPage(bestTotalPages);
    } else if (pageNumber > bestTotalPages) {
      setBestCurrentPage(1);
    } else {
      setBestCurrentPage(pageNumber);
    }
  };

  const handleAllPaginate = (pageNumber: number) => {
    if (pageNumber < 1) {
      setAllCurrentPage(allTotalPages);
    } else if (pageNumber > allTotalPages) {
      setAllCurrentPage(1);
    } else {
      setAllCurrentPage(pageNumber);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-7xl px-2 lg:px-8">
      <div className="mb-8" id="all-courses-section">
        <h2 className="text-2xl font-semibold mb-4">Best Courses</h2>
        <div
          className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 m-2"
          style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
        >
          {currentBestCourses.length === 0 ? (
            "No Best Courses Available"
          ) : (
            <>
              {currentBestCourses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </>
          )}
        </div>
        <Pagination
          coursesPerPage={coursesPerPage}
          totalCourses={bestCourses.length}
          currentPage={bestCurrentPage}
          paginate={handleBestPaginate}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        <div
          className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4"
          style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
        >
          {currentAllCourses.length === 0 ? (
            "No Courses Available"
          ) : (
            <>
              {currentAllCourses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </>
          )}
        </div>
        <Pagination
          coursesPerPage={coursesPerPage}
          totalCourses={allCourses.length}
          currentPage={allCurrentPage}
          paginate={handleAllPaginate}
        />
      </div>
    </div>
  );
};

export default CoursesList;
