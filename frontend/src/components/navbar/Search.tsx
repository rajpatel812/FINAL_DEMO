"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchCourse } from "@/store/slice/courseSlice";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";

const Search = () => {
  const [str, setStr] = useState("");
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(str, 300);
  const pathname = usePathname()

  // console.log(debouncedSearchTerm, str);
  useEffect(() => {
    dispatch(searchCourse(str));
  }, [debouncedSearchTerm]);
  // Function to toggle dropdown visibility
  const handelSearch = (e: any) => {
    setStr(e.target.value);
     const allCoursesSection = document.getElementById("all-courses-section");
     if (allCoursesSection) {
       allCoursesSection.scrollIntoView({ behavior: "smooth" });
     }
  };

  return (
    <>
        <div className="max-w-sm">
          <div className={`relative `}>
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <svg
                className="flex-shrink-0 size-4  "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              className="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              type="text"
              placeholder="Type a name"
              value={str}
              onChange={handelSearch}
              disabled = {pathname !== "/"}
            />
          </div>
        </div>
    </>
  );
};

export default Search;
