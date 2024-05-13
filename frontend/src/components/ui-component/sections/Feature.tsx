import React from 'react'

import Image from "next/image";

function Feature() {

  const scrollToAllCourses = () => {
    const allCoursesSection = document.getElementById("all-courses-section");
    if (allCoursesSection) {
      allCoursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      {/* Features Section */}
      <section className="px-3 py-5 bg-neutral-100 lg:py-10" id="home_section">
        <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
          <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            {/* <p className="text-4xl font-bold md:text-7xl text-orange-600">
              Q-Learning
            </p> */}
            <p className="text-4xl font-bold md:text-7xl text-purple-600 justify-center items-center flex flex-col text-center ml-6 ">
              Quantum Knowledge with Q-Learning
            </p>
            <p className="mt-2 text-sm md:text-lg">
              Start Learning form Today!
            </p>
            <button
              className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800"
              onClick={scrollToAllCourses}
            >
              Explore Now!
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
              layout="responsive" // Adjusts the image size while maintaining aspect ratio
              objectFit="cover" // Ensures the image covers the entire container
              objectPosition="center" // Centers the image within the container
              width={1000}
              height={1000}
              src="http://res.cloudinary.com/dgdumobsz/Images/dfqttmoxokukeavuojdc"
              alt="Image"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feature
