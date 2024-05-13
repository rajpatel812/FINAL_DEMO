import { useState } from "react";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import { string } from "yup";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

type Stripe = import("@stripe/stripe-js").Stripe;

const stripePromise: Promise<Stripe | null> = publicKey
  ? loadStripe(publicKey)
  : Promise.resolve(null);

function CheckOut({
  totalPrice,
  checkedCourses,
}: {
  totalPrice: number;
  checkedCourses: number[];
}) {
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const existingUser = await axios.get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const userData = existingUser.data; // No need to await here
      // console.log("userData: ", userData);

      const payment = await axios.post(`${BASE_URL}/payment/process_payment/`, {
        totalPrice: Number(totalPrice),
        userData: userData,
        checkedCourses: checkedCourses,
      });

      const data = payment.data;
      // console.log("data: ", data);
      // const sessionId = data.sessionId;

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe.js has not loaded yet");
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });  

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  // console.log(totalPrice);

  return (
    <div>
      {totalPrice !== 0 && (
        <button
          className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
          onClick={handleCheckout}
        >
          Pay Rs. {totalPrice.toFixed(2)}
        </button>
      )}
    </div>
  );
}

export default CheckOut;
