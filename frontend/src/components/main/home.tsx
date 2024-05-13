"use client";

import React from "react";
import CourseList from "../course/CourseList";
import Feature from "../ui-component/sections/Feature";
import Bottom from "../ui-component/sections/Bottom";
import  FaqFour  from "../ui-component/sections/FaqFour";


function HomePage() {



  return (
    <div
      className="w-full  translate-y-[5rem] "
      style={{ overflowY: "scroll", marginTop: "0rem" }}
    >
      {/* Features Section */}
      <Feature/>
      <div className="mx-auto my-10 max-w-7xl px-2 lg:px-8">
        <div className="">
          <CourseList />
        </div>
      </div>

      {/* bottom section */}
      <Bottom/>

      <FaqFour/>
    </div>
  );
}

export default HomePage;
