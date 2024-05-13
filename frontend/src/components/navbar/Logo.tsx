"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {isALlCourses} from "../../store/slice/courseSlice"

const Logo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleImage = async () => {
    router.push("/")
    await dispatch(isALlCourses());
  };
  return (
    <Image
      onClick={handleImage}
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
      height="150"
      width="150"
      alt="Logo"
    />
  );
};

export default Logo;
