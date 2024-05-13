import React from "react";

const FaqFour = () => {
  return (
    <section className="px-2 py-10">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
          Here are some common questions about our platform. If you can't find
          the answer you're looking for, feel free to contact us.
        </p>
      </div>
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-black">
            How do I enroll in a course?
          </h2>
          <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
            To enroll in a course, simply browse through our course catalog,
            select the course you're interested in, and click the "Enroll"
            button. You'll then be prompted to create an account or sign in if
            you haven't already. Once enrolled, you'll have access to the course
            content.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-black">
            How long do I have access to a course?
          </h2>
          <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
            Once enrolled in a course, you'll have lifetime access to the course
            materials, unless otherwise specified. This means you can learn at
            your own pace and revisit the content whenever you need to. You'll
            also have access to any future updates or additions to the course.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-black">
            Can I access my courses on multiple devices?
          </h2>
          <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
            Yes, you can access your courses on multiple devices. Our platform
            is designed to be responsive and accessible from various devices,
            including computers, tablets, and smartphones. Simply log in to your
            account from any compatible device to access your enrolled courses.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black">
            Are there any prerequisites for taking courses?
          </h2>
          <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
            Prerequisites vary depending on the course. Some courses may have
            specific prerequisites or recommended background knowledge, which
            will be mentioned in the course description. Make sure to review the
            course details before enrolling to ensure it meets your
            requirements.
          </p>
        </div>
      </div>
      <p className="mt-10 text-center text-gray-600">
        Can't find what you're looking for?{" "}
        <a href="/contact" title="" className="black font-semibold hover:underline">
          Contact us
        </a>
      </p>
    </section>
  );
};

export default FaqFour;
