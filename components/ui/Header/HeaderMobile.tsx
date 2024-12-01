"use client";
import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeaderMobile() {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <header className="fixed top-0 inset-x-0 p-6 bg-black z-[100] block md:hidden">
      <nav className="container mx-auto">
        <div className="flex flex-auto items-center justify-between h-4">
          <motion.button
            initial="hide"
            animate={mobileNav ? "show" : "hide"}
            onClick={toggleMobileNav}
            className="flex flex-col space-y-1 relative z-10"
          >
            <motion.span
              variants={{
                hide: {
                  rotate: 0,
                },
                show: {
                  rotate: 45,
                  y: 5,
                },
              }}
              className="w-6 bg-white h-px block"
            ></motion.span>
            <motion.span
              variants={{
                hide: {
                  opacity: 1,
                },
                show: {
                  opacity: 0,
                },
              }}
              className="w-6 bg-white h-px block"
            ></motion.span>
            <motion.span
              variants={{
                hide: {
                  rotate: 0,
                },
                show: {
                  rotate: -45,
                  y: -5,
                },
              }}
              className="w-6 bg-white h-px block"
            ></motion.span>
          </motion.button>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/assets/img/logos/blanco.png"
            alt="Logo White"
            className="w-[120px]"
          />
        </div>
        <AnimatePresence>
          {mobileNav && (
            <MotionConfig
              transition={{
                type: "spring",
                bounce: 0.05,
              }}
            >
              <motion.div
                key="mobile-nav"
                variants={{
                  hide: {
                    x: "-100%",
                    transition: {
                      type: "spring",
                      bounce: 0.05,
                      when: "afterChildren",
                      staggerChildren: 0.01,
                    },
                  },
                  show: {
                    x: "0%",
                    transition: {
                      type: "spring",
                      bounce: 0.05,
                      when: "beforeChildren",
                      staggerChildren: 0.01,
                    },
                  },
                }}
                initial="hide"
                animate="show"
                exit="hide"
                className="fixed inset-0 bg-black p-6 flex flex-col justify-center space-y-10 lg:hidden"
              >
                <motion.ul
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="list-none space-y-6"
                >
                  <li>
                    <Link href={"/"} onClick={toggleMobileNav}>
                      <p className="text-5xl font-semibold text-white cursor-pointer">
                        Inicio
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/shop"} onClick={toggleMobileNav}>
                      <p className="text-5xl font-semibold text-white cursor-pointer">
                        Productos
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/faq"} onClick={toggleMobileNav}>
                      <p className="text-5xl font-semibold text-white cursor-pointer">
                        Preguntas
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/contact"} onClick={toggleMobileNav}>
                      <p className="text-5xl font-semibold text-white cursor-pointer">
                        Contacto
                      </p>
                    </Link>
                  </li>
                </motion.ul>
                <motion.div
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="w-full h-px bg-white/30"
                ></motion.div>
                <motion.ul
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="list-none flex justify-center gap-x-4"
                >
                  {/* <li>
                    <div className="bg-white rounded-lg w-8 h-8"></div>
                  </li>
                  <li>
                    <div className="bg-white rounded-lg w-8 h-8"></div>
                  </li>
                  <li>
                    <div className="bg-white rounded-lg w-8 h-8"></div>
                  </li> */}
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src="/assets/img/logos/blanco.png"
                    alt="Logo White"
                    className="w-[200px]"
                  />
                </motion.ul>
              </motion.div>
            </MotionConfig>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
