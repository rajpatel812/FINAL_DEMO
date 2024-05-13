
import React from "react";
import UserLayout from "../UserLayout";
import CartComponent from "@/components/myCart/Cart";

const CartPage = () => {
  return (
    <div>
      <UserLayout>
        <CartComponent />
      </UserLayout>
    </div>
  );
};

export default CartPage;
