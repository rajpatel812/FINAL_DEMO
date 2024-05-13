import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/store/slice/cartSlice";
import { getCourse } from "@/store/slice/courseSlice";
import { any } from "zod";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function CartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const status = useSelector((state: any) => state.cart.status);
  const error = useSelector((state: any) => state.cart.error);
  const router = useRouter();
  const pathname = usePathname();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchCartItems(token));
  }, [dispatch]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const updatedItems = await Promise.all(
          cartItems.map(async (item:any) => {
            const response = await dispatch(getCourse(item.course));
            return response.payload;
          })
        );
        setItems(updatedItems.reverse());
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchCourseDetails();
    }
  }, [cartItems, dispatch]);

  const toggleDropdown = () => {
    const token = localStorage.getItem("token");
    dispatch(fetchCartItems(token));
    setIsOpen(true);
  };
  const toggleDropdown2 = () => {
    setIsOpen(false);
  };

  const handleCartClick= () => {
    router.push("/cart");
  }

  return (
    <div className="relative">
      {/* Cart icon */}
      <button id="cartBtn">
        <AiOutlineShoppingCart
          size={25}
          onMouseOver={toggleDropdown}
          onMouseLeave={toggleDropdown2}
          onClick={handleCartClick}
        />
        <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          {items.length}
        </div>
      </button>

      {/* Dropdown content */}
      {isOpen && pathname== "/" && (
        <div className="absolute top-full right-0 bg-white divide-y rounded-lg">
          {/* Your cart content */}
          <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
            {items.length === 0 ? (
              <div className="text-center text-xl">Your cart is empty</div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">Your cart</h2>
                <ul className="flex flex-col divide-y dark:divide-gray-300">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col py-6 sm:flex-row sm:justify-between"
                    >
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <div className="flex flex-col justify-between w-full pb-4">
                          <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                {item.title}
                              </h3>
                              <p className="text-sm dark:text-gray-600">
                                by {item.created_by}
                              </p>
                              <p className="flex justify-center mt-3 text-sm text-gray-600">
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
                            <div className="text-right">
                              <p className="text-lg font-semibold">
                                Rs.{item.price}
                              </p>
                              {/* You can add more information like discount price here */}
                            </div>
                          </div>
                          <div className="flex text-sm divide-x">
                            {/* Add remove and favorite buttons here */}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="space-y-1 text-right">
              {/* Total amount and other information */}
            </div>
            <div className="flex justify-end space-x-4">
              {/* Back to shop and checkout buttons */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartMenu;

