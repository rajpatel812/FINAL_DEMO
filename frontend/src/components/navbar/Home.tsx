import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { isALlCourses } from "../../store/slice/courseSlice";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleHome = async () => {
    router.push("/");
    await dispatch(isALlCourses());
     const home = document.getElementById("home_section");
     if (home) {
       home.scrollIntoView({ behavior: "smooth" });
     }
  };
  return (
    <>
      <button
        onClick={handleHome}
        className="hover:bg-graytext-gray-900 hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-black dark:hover:bg-gray-100 "
      >
        Home
      </button>
    </>
  );
};

export default Home;
