import React from "react";
import { Header } from "./Header";
import HeaderMobile from "./HeaderMobile";

export const HeaderContainer = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
    </div>
  );
};
