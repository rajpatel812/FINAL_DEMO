"use client";

import { getUserProfile, updateUserProfile } from "@/store/slice/authSlice";
import { Console } from "console";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/schemas/UserSchema";
import { nullable } from "zod";
import toast from 'react-hot-toast'
// import CoursePayment from "./course-payment"

const ProfileComponent = () => {
  const [image, setImage] = useState<any>("");
  const [token, setToken] = useState<string | null>();
  const userData = useSelector((state: any) => state.user.userProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken);
    dispatch(getUserProfile(userToken));
  }, []);

  const handleSubmit = async (val: any) => {
    // console.log(formik.values);
    try {
      const response = await dispatch(
        updateUserProfile({ userToken: token, updatedata: val })
      );
    } catch (error) {
      throw error;
    } finally {
    }
    // console.log(status);
  };
  // console.log(image);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      formik.setFieldValue("profile_image", file); // Update formik values with the selected file
    }
  };

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      contact_no: userData?.contact_no || "",
      profile_image: userData?.profile_image || null,
      occupation: userData?.occupation || "",
      password: "",
      password2: "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: updateUser,
  });

  // console.log(userData)

  return (
    <div className="p-16 text-white">
      <div className="p-8 bg-gray-500 shadow mt-40 relative">
        <div className="felx felx-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={image || userData?.profile_image}
              width={1000}
              height={1000}
              alt="Profile"
              className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 object-cover"
            />
          </div>
        </div>

        <form className="mt-20" method="POST" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1 mt-24 items-center justify-center text-center border-b pb-12">
            <div className="bg-stone-700 cursor-pointer text-white rounded-xl  font-semibold px-8 py-4">
              <label htmlFor="profile-image-upload" className="cursor-pointer">
                Change Profile
              </label>
              <input
                type="file"
                name="profile_image"
                className="cursor-pointer"
                id="profile-image-upload"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </div>
            <h1 className="text-4xl mt-8 font-medium text-white">
              {userData?.name}
            </h1>
            <p className="mt-1 text-dark-500">{userData?.occupation}</p>
          </div>

          {/* user profile updation form */}

          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-white">
                Personal Information
              </h2>
              {/* <p className="mt-1 text-sm leading-6 text-white">
                Use a permanent address where you can receive mail.
              </p> */}

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      placeholder="John Doe"
                      autoComplete="email"
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                          {String(formik.errors.name)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      disabled
                      placeholder="johndoe@gmail.com"
                      autoComplete="email"
                      className="p-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                          {String(formik.errors.email)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* More input fields for address */}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact_no"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="contact_no"
                      name="contact_no"
                      value={formik.values.contact_no}
                      onChange={formik.handleChange}
                      type="tel"
                      placeholder="+914545453635"
                      autoComplete="tel"
                      className="px-2     block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.contact_no && formik.errors.contact_no && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500 ">
                        <span className="font-medium">
                          {String(formik.errors.contact_no)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="occupation"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Occupation
                  </label>
                  <div className="mt-2">
                    <input
                      id="occupation"
                      name="occupation"
                      value={formik.values.occupation}
                      onChange={formik.handleChange}
                      type="text"
                      placeholder="Software Developer"
                      autoComplete="occupation"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.occupation && formik.errors.occupation && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                          {String(formik.errors.occupation)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Change Password
                  </label>

                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      type="password"
                      placeholder="Enter new password"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                          {formik.errors.password}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Confirm Password
                  </label>

                  <div className="mt-2">
                    <input
                      id="password"
                      name="password2"
                      onChange={formik.handleChange}
                      type="password"
                      placeholder="Enter confirm password"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.password2 && formik.errors.password2 && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                          {formik.errors.password2}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <a href="/payment/myCourses">
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                My Courses
              </button>
            </a>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={()=> toast.success("Saved Successfully!")}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
