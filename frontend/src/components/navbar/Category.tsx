import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../store/slice/courseSlice";

import { usePathname } from "next/navigation";

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const pathname = usePathname();

  // console.log("pathname: " , pathname === "/");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/categories");
        // console.log("..........", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryEvent = (id: number) => {
    // console.log("Selected category:", id);
    dispatch(getAllCourses(id));
  };
  const scrollToCourses = () => {
    const allCoursesSection = document.getElementById("all-courses-section");
    if (allCoursesSection) {
      allCoursesSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      className="relative"
      onMouseOver={() => setIsOpen(true)}
      onMouseOut={() => setIsOpen(false)}
    >
      {/* Button to trigger dropdown */}
      <button
        id="dropdownHoverButton"
        className="hover:bg-graytext-gray-900 hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-black dark:hover:bg-gray-100"
        // Handle click event to toggle dropdown
        onMouseOver={scrollToCourses}
      >
        Category
      </button>

      {/* Dropdown content */}
      {isOpen && pathname === "/" && (
        <div className="absolute top-full left-0 z-10 bg-white divide-y divide-white rounded-lg shadow w-44 dark:bg-white">
          <ul
            className="py-2 text-sm text-black-700 dark:text-black-800"
            aria-labelledby="dropdownHoverButton"
          >
            {(categories as any[]).map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryEvent(category.id)}
              >
                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-white-600 dark:hover:text-black hover:cursor-pointer">
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Category;
