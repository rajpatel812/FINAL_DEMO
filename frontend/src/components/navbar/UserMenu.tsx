"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/navigation";
// import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import CartMenu from "./CartMenu";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { userLogout, getUserProfile } from "../../store/slice/authSlice";

interface UserMenuProps {}

const UserMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>();

  // console.log("token",token)
  // const toggleOpen =(() => {
  //   setIsOpen(true);
  // });

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    setToken(token);
    dispatch(getUserProfile(token));
  }, [isOpen, token]);

  const userData = useSelector((state: any) => state.user.userProfile);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    dispatch(userLogout());
    router.push("/");
  };

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {token && <CartMenu />}
        </div>
        <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu onMouseEnter={() => setIsOpen(true)} />
          <div className="flex items-center justify-center">
            <Avatar src={userData?.profile_image} className="w-8 h-8" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 text-sm">
          <div className="flex flex-col cursor-pointer">
            {token ? (
              <div>
                <MenuItem to="/profile" label="Profile" />
                <div onClick={handleLogout}>
                  <MenuItem to="" label="Logout" />
                </div>
              </div>
            ) : (
              <div>
                <MenuItem to="/auth/register" label="Sign Up" />
                <MenuItem to="/auth/login" label="Sign in" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
