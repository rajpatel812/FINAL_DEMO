import React from "react";
import UserLayout from "../../UserLayout";
import CourseDetail from "@/components/courseDetail/CourseDetail";

const ProfilePage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <UserLayout>
        <CourseDetail id={params.id}/>
      </UserLayout>
    </div>
  );
};

export default ProfilePage;
