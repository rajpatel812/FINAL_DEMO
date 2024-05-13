import React from 'react'
import {AboutPageOne} from "../../../components/ui-component/aboutUs/AboutUs";
import UserLayout from '../UserLayout';

function AboutUs() {
  return (
    <div>
      <UserLayout>
        <AboutPageOne/>
      </UserLayout>
    </div>
  );
}

export default AboutUs;
