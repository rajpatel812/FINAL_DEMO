import React from 'react'
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '@/store/slice/cartSlice';
import { fetchCoursePayments } from "../../store/slice/paymentSlice";


function AddToCart({id}: {id:number}) {
  const [authToken, setAuthToken] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [alertColor, setAlertColor] = useState('');
  const dispatch = useDispatch();
  const payments = useSelector((state: any) => state.payments?.payments || []);

  useEffect(() => {  
    const token = localStorage.getItem("token");
    if (token) {    
      setAuthToken(token);
    } else {
      console.error("Auth token not found in local storage");
    }
  }, []);

   useEffect(() => {
     const token = localStorage.getItem("token");
     dispatch(fetchCoursePayments(token));
   }, [dispatch]);
   
  // console.log("payments", payments)
  // console.log("id==", id, "payment==", payments[0]['course'])

  const isCoursePurchased = payments.some((item: any) =>
    Number(item.course) == id
  );
  // console.log("isCoursePurchased", isCoursePurchased);

const handleAddToCart = async (id: number, authToken: string) => {
  try {
    // Fetch user profile to get user ID
    const responseProfile = await axios.get(
      "http://127.0.0.1:8000/user/profile",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const userId = responseProfile.data.id;

    // console.log("user logged in >>>>>>",responseProfile);
    // Add item to cart
    await axios.post(
      `http://127.0.0.1:8000/cart/add/${id}/`,
      {
        course: id,
        user: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    // Dispatch action to fetch updated cart items
    dispatch(fetchCartItems(authToken));

    // Show success message or perform other actions
    setPopupMessage("Item added to cart successfully");
    setAlertColor("green");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  } catch (error: any) {
    console.error("Error adding course to cart:", error.response.data.message);
    setPopupMessage(error.response.data.message || "You are not logged in so Kindly Login!");
    setAlertColor("red");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  }
};



  return (
    <>
      {isCoursePurchased ? (
        <button
          className="ml-auto bg-gray-400 text-white py-2 px-6 rounded-md cursor-not-allowed"
          disabled
        >
          Already Purchased
        </button>
      ) : (
        <button
          className="ml-auto bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-400 focus:outline-none"
          onClick={() => handleAddToCart(id, authToken)}
        >
          Add To Cart
        </button>
      )}

      {showPopup && (
        <div
          id="alert-border"
          className={`flex fixed bottom-0 right-0 items-center p-4 mb-4 text-${alertColor}-800 border-t-4 border-${alertColor}-300 bg-${alertColor}-50 dark:text-${alertColor}-400 `}
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">{popupMessage}</div>
        </div>
      )}
    </>
  );
}

export default AddToCart
