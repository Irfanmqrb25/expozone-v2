"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";

import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { IoCubeOutline } from "react-icons/io5";
import { BiNews } from "react-icons/bi";
import { MdOutlineFeaturedPlayList, MdOutlineSell } from "react-icons/md";
import { Slant as Hamburger } from "hamburger-react";
import clsx from "clsx";
import { ExtendedSession } from "@/next-auth";

const fredoka = Fredoka({
  weight: ["600"],
  subsets: ["latin"],
});

interface HeaderProps {
  session: ExtendedSession;
}

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
});

const Header: React.FC<HeaderProps> = ({ session }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 92);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggled = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      {/* for desktop */}
      <nav className="flex-col hidden w-full lg:flex">
        <div className="flex items-center justify-between border-b-2 border-black">
          <div className="py-5 border-r-2 border-black px-14">
            <Image
              src="/assets/brand-logo.svg"
              alt="brand logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <h1
            className={clsx(
              "font-bold text-5xl cursor-default",
              fredoka.className
            )}
          >
            EXPOZONE
          </h1>
          <Link
            href={session ? "/featured" : "/auth/sign-in"}
            className="border-l-2 border-black px-14 py-[29px] hover:bg-[#23A094] cursor-pointer"
          >
            {session ? (
              <p className={clsx("text-2xl", patrickHand.className)}>NEXT</p>
            ) : (
              <p className={clsx("text-2xl", patrickHand.className)}>SIGN IN</p>
            )}
          </Link>
        </div>

        <div
          className={clsx(
            "flex justify-between px-14 py-3 border-b-2 border-black items-center",
            isScrolled &&
              "fixed w-full top-0 left-0 transition-all duration-300 py-2 bg-white z-10",
            patrickHand.className
          )}
        >
          <div
            className={clsx(
              "flex items-center w-full",
              isScrolled ? "justify-between" : "justify-center"
            )}
          >
            {isScrolled && (
              <div className="flex items-center space-x-1">
                <Image
                  src="/assets/brand-logo.svg"
                  alt="your image"
                  width={40}
                  height={40}
                  className="transition-all duration-500"
                />
                <h1
                  className={clsx(
                    "font-bold text-3xl cursor-default",
                    fredoka.className
                  )}
                >
                  EXPOZONE
                </h1>
              </div>
            )}
            <ul
              className={clsx(
                "flex flex-row text-sm tracking-wider",
                isScrolled ? "space-x-16" : "space-x-24"
              )}
            >
              <Link href="/" className="underline underline-offset-4">
                HOME
              </Link>
              <Link href="/featured">FEATURED</Link>
              <Link href="/products">PRODUCTS</Link>
              <p className="hover:cursor-not-allowed">NEW ARRIVALS</p>
              <p className="hover:cursor-not-allowed">BLOG</p>
            </ul>
            {isScrolled && (
              <Link
                href={session ? "/featured" : "/login"}
                className="border border-black px-6 py-2 hover:bg-[#23A094] hover:text-white tracking-wider"
              >
                {session ? "NEXT" : "LOGIN"}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* for mobile */}
      <nav
        className={clsx(
          "fixed w-full border-b-2 border-black bg-white z-10 lg:hidden",
          isOpen && ""
        )}
      >
        <div className="z-20 flex items-center justify-between px-5 py-3">
          <div className="z-20 flex items-center space-x-1">
            <Image
              src="/assets/brand-logo.svg"
              alt="Your Image"
              width={30}
              height={30}
              className="transition-all duration-500"
            />
            <h1
              className={clsx(
                "font-bold text-2xl cursor-default",
                fredoka.className
              )}
            >
              EXPOZONE
            </h1>
          </div>
          <Hamburger
            toggled={isOpen}
            toggle={handleToggled}
            size={30}
            rounded
          />
        </div>
        <ul
          className={clsx(
            "bg-black text-white fixed w-full text-lg tracking-wider px-3 flex flex-col justify-evenly",
            isOpen
              ? " h-[350px] ease-in-out duration-150"
              : "h-0 ease-in-out duration-200",
            patrickHand.className
          )}
        >
          {isOpen && (
            <>
              <Link
                href="/login"
                className="flex items-center gap-4 p-3 hover:text-[#23A094]"
              >
                <AiOutlineUser />
                <span>Login</span>
              </Link>
              <Link
                href="/"
                className="flex items-center gap-4 p-3  hover:text-[#23A094]"
              >
                <AiOutlineHome />
                <span>Home</span>
              </Link>
              <Link
                href="/featured"
                className="flex items-center gap-4 p-3  hover:text-[#23A094]"
              >
                <MdOutlineFeaturedPlayList />
                <span>Featured</span>
              </Link>
              <Link
                href="/products"
                className=" flex items-center gap-4 p-3  hover:text-[#23A094]"
              >
                <IoCubeOutline />
                <span>Products</span>
              </Link>
              <li className="flex items-center gap-4 p-3  hover:text-[#23A094]">
                <MdOutlineSell />
                <span>New Arrivals</span>
              </li>
              <li className="flex items-center gap-4 p-3 hover:text-[#23A094]">
                <BiNews />
                <span>Blogs</span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
