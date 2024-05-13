import ProfileComponent from "@/components/Profile/profile-page";
import CoursePayment from "@/components/Profile/course-payment";
import React from "react";
import UserLayout from "../../UserLayout";

const ProfilePage = () => {
  return (
    <div>
      <UserLayout>
        <CoursePayment />
      </UserLayout>
    </div>
  );
};

export default ProfilePage;
