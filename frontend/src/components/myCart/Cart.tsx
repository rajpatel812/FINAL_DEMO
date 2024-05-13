"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeCartItem } from "@/store/slice/cartSlice";
import { getCourse } from "@/store/slice/courseSlice";
import Rating from "@mui/material/Rating";
import CheckOut from "./CheckOut";

function CartComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const status = useSelector((state: any) => state.cart.status);
  const error = useSelector((state: any) => state.cart.error);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchCartItems(token));
  }, [dispatch, removeCartItem]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const updatedItems = await Promise.all(
          cartItems.map(async (item: any) => {
            const response = await dispatch(getCourse(item.course));
            return response.payload;
          })
        );
        setItems(updatedItems.reverse());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchCourseDetails();
    }
  }, [cartItems, dispatch, removeCartItem]);

  const handleRemove = (itemId: any) => {
      const token = localStorage.getItem("token");
  
      dispatch(removeCartItem({ itemId, token })).then(() => {
        dispatch(fetchCartItems(token)).then(() => {
          const willBeEmptyCart = items.length === 1;
          if (willBeEmptyCart) {
            window.location.reload();
          }
        });
      });
  };

  const subTotal = items
    .reduce((acc, item) => {
      if (item.checked) {
        return acc + item.price;
      } else {
        return acc;
      }
    }, 0);


  const handleCheckboxChange = (courseId: number, e: any) => {
    // console.log(courseId, e.target.checked);
    setItems((prevState) => {
      // console.log(prevState);
      const modifiedItem = prevState.find((item) => item.id === courseId);
      modifiedItem.checked = e.target.checked;
      // console.log(modifiedItem);
      // console.log("/////////",[...prevState]);
      return [...prevState];
    });
  };

const checkedCourses = items
  .filter((item) => item.checked)
  .map((item) => item.id);

const isEmptyCart = items.length === 0 ;

useEffect(() => {
  const checkPaidCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/payment/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("!!!!!!!!!!!",response.data)
      const paidCourseIds = response.data.map((item: any) => item.course);
      console.log("paidCourseIds",paidCourseIds)

      paidCourseIds.forEach((paidCourseId: any) => {
         handleRemove(paidCourseId);
       });
    } catch (error) {
      console.error("Error checking paid courses:", error);
    }
  };
  
    checkPaidCourses();
}, []);


  return (
    <div className="h-full bg-gray-300 mt-20">
      <div className="py-12">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
          <div className="md:flex ">
            <div className="w-full p-4 px-5 py-5">
              <div className="md:grid md:grid-cols-3 gap-2 ">
                <div className="col-span-2 p-5">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">Shopping Cart</h1>
                    <a href="/payment/myCourses">
                      <button
                      type="button"
                      className="px-3 py-2 rounded-md bg-indigo-600 text-white font-semibold text-sm shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                      My Courses
                    </button>
                      </a>
                  </div>

                  {isEmptyCart ? (
                    <div className="text-center text-xl">
                      Your cart is empty
                    </div>
                ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mt-6 pt-6 border-t"
                      >
                        <div className="flex  items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4  rounded mx-2"
                            onChange={(e) => handleCheckboxChange(item.id, e)}
                            checked={item.checked}
                          />
                          <img
                            src={`http://res.cloudinary.com/dgdumobsz/${item.thumbnail}`}
                            width={"100px"}
                            height={"100px"}
                            className=""
                            alt={item.title}
                          />

                          <div className="flex flex-col ml-3">
                            <span className="md:text-md font-medium">
                              {item.title}
                            </span>

                            <p className="text-sm dark:text-gray-600">
                              by {item.created_by}
                            </p>
                            <p className="text-sm dark:text-gray-600 grid grid-flow-col auto-cols-max items-center">
                              <span className="mr-2 mt-1 font-semibold">
                                {item.rating}
                              </span>
                              <Rating
                                defaultValue={item.rating}
                                precision={0.1}
                                readOnly
                              />
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="pr-8 ">
                            <span className="text-xm font-medium">
                              Rs.{item.price.toFixed(2)}
                            </span>
                          </div>
                          <button onClick={() => handleRemove(item.id)}>
                            remove
                          </button>
                          <div>
                            <i className="fa fa-close text-xs font-medium"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <div className="flex items-center">
                      <i className="fa fa-arrow-left text-sm pr-2"></i>
                      <a href="/">
                        <span className="text-md  font-medium text-blue-500">
                          Continue Shopping
                        </span>
                      </a>
                    </div>

                    <div className="flex justify-center items-end">
                      <span className="text-lg font-medium text-gray-600 mr-1">
                        Subtotal:
                      </span>
                      <span className="text-lg font-bold text-gray-800 ">
                        Rs.{subTotal}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" p-5 bg-gray-800 rounded overflow-visible">
                  <span className="text-xl font-medium text-gray-100 block pb-3">
                    Card Details
                  </span>

                  <span className="text-xs text-gray-400 ">Card Type</span>

                  <div className="overflow-visible flex justify-between items-center mt-2">
                    <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
                      <span className="italic text-lg font-medium text-gray-200 underline">
                        VISA
                      </span>

                      <div className="flex justify-between items-center pt-4 ">
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs  text-gray-200">
                          Raj Patel
                        </span>
                        <span className="text-xs  text-gray-200">12/18</span>
                      </div>
                    </div>
                    <div className="flex justify-center  items-center flex-col">
                      <img
                        src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
                        width="40"
                        className="relative right-5"
                      />
                      <span className="text-xs font-medium text-gray-200 bottom-2 relative right-5">
                        mastercard.
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center flex-col pt-3">
                    <label className="text-xs text-gray-400 ">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                      placeholder="Raj Patel"
                    />
                  </div>

                  <div className="flex justify-center flex-col pt-3">
                    <label className="text-xs text-gray-400 ">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                      placeholder="****     ****      ****      ****"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
                    <div className="col-span-2 ">
                      <label className="text-xs text-gray-400">
                        Expiration Date
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                          placeholder="mm"
                        />
                        <input
                          type="text"
                          className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                          placeholder="yyyy"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label className="text-xs text-gray-400">CVV</label>
                      <input
                        type="text"
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        placeholder="XXX"
                      />
                    </div>
                  </div>

                  <CheckOut
                    totalPrice={subTotal}
                    checkedCourses={checkedCourses}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartComponent;
