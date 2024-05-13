"use client";

import { useEffect, useState } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Category from "./Category";
import CartMenu from "./CartMenu";
import Home from "./Home";
import AboutUs from "./About";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [token, setToken] = useState<string | null>();

  return (
    <div
      className="w-full bg-white shadow-sm"
      style={{ position: "fixed", top: 0, zIndex: 1 }}
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between">
            <Logo />
            <Home />
            <AboutUs />
            <Category />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
