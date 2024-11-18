"use client";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useWindowSize from "@/app/src/utils/windowSize";
import { header, navItem } from "@/app/src/data/data.header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";

export const Header = () => {
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [height] = useWindowSize();

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = () => {
    const scrollTop = window.scrollY;
    setFixedNav(scrollTop > 10);
  };

  useEffect(() => {
    if (openMenu) {
      if (height < 767) {
        disableBodyScroll(document.body);
      } else {
        enableBodyScroll(document.body);
      }
    } else {
      enableBodyScroll(document.body);
    }
  }, [openMenu, height]);

  return (
    <>
      {/* <!-- BEGIN HEADER --> */}
      <header className="header">
        <div className={`header-content ${fixedNav ? "fixed" : ""}`}>
          <div className="header-logo w-[150px] h-auto">
            <Link href="/">
              <p>
                <img className="w-auto h-auto" src={header.logo} alt="" />
              </p>
            </Link>
          </div>
          <div style={{ right: openMenu ? 0 : -360 }} className="header-box">
            <Nav navItem={navItem} />
          </div>

          <div
            onClick={() => setOpenMenu(!openMenu)}
            className={
              openMenu ? "btn-menu js-btn-menu active" : "btn-menu js-btn-menu"
            }
          >
            {[1, 2, 3].map((i) => (
              <span key={i}>&nbsp;</span>
            ))}
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
