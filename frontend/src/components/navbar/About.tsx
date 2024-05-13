import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { isALlCourses } from "../../store/slice/courseSlice";

const AboutUs = () => {
  const router = useRouter();
  const handleHome = async () => {
    router.push("/aboutUs");
  };
  return (
    <>
      <button
        onClick={handleHome}
        className="hover:bg-graytext-gray-900 hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-black dark:hover:bg-gray-100 "
      >
        About US
      </button>
    </>
  );
};

export default AboutUs;
