"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursePayments } from "../../store/slice/paymentSlice";
import { Course } from "@/utils/courseInterface";
import CourseCard from "../course/CourseCard";
import Pagination from "../ui-component/Pagination";
import { getAllCourses } from "@/store/slice/courseSlice";
import { getCourse } from "../../store/slice/courseSlice";

const CoursePayment = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state: any) => state.payments?.payments || []);
  const loading = useSelector((state: any) => state.payments?.loading || false);
  const error = useSelector((state: any) => state.payments?.error || null);
  const courses = useSelector((state: any) => state.course?.courses || null);
  const coursesPerPage = 4;
  const [currPage, setCurrPage] = useState(1);
  const [paidCourses, setPaidCourses] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchCoursePayments(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourses());
    filterPaidCourse();
  }, [payments, currPage]);

  // const courses = useSelector((state: any) => state.course.courses);
  // console.log("dsdsdsdsdsd", courses);
  // console.log("Fetching courses paid......", payments)
  const indexOfLastCourse = currPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = payments.slice(indexOfFirstCourse, indexOfLastCourse);

  // console.log(currentCourses , "!!!!!!!!!!!!!!!!!")

  const totalPages = Math.ceil(payments.length / coursesPerPage);

  const handlePaginate = (pageNumber: number) => {
    // Handle pagination logic here if needed
    setCurrPage(pageNumber);
  };

  const filterPaidCourse = async () => {
    const filteredCourses = courses.filter((course: any) =>
      currentCourses.some((payment: any) => payment.course === course.id)
    );
    // console.log("filter courses",filteredCourses);
    setPaidCourses([...filteredCourses]);

  };

  // console.log("paid...........",paidCourses);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="bg-gray-100 text-center text-black py-16 my-5 overflow-y-hidden">
      <div className="mx-auto my-10 max-w-7xl px-2 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Purchased Courses</h2>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && (
            <>
              <div
                className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 m-2"
                style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
              >
                {paidCourses.length === 0 ? (
                  <div>No Purchased Courses Available</div>
                ) : (
                  paidCourses.map((course: Course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                )}
              </div>
              <Pagination
                coursesPerPage={coursesPerPage}
                totalCourses={payments.length}
                currentPage={currPage}
                paginate={handlePaginate}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursePayment;
