import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/navbar/Header";

import clsx from "clsx";
import {
  VscDebugBreakpointDataUnverified,
  VscDebugBreakpointLogUnverified,
} from "react-icons/vsc";
import { getCurrentUser } from "@/data/get-user";

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--patrick-hand",
});

const LandingPage = async () => {
  const session = await getCurrentUser();
  return (
    <div className="flex flex-col">
      <Header session={session!} />
      <div className="flex flex-col w-full mt-16 border-b-2 border-black lg:flex-row lg:mt-0">
        <div className="flex flex-col items-center border-b-2 xl:border-b-0 lg:border-r-2 border-black justify-center mx-auto space-y-6 lg:space-y-4 bg-[#FF6D28] w-full lg:w-1/2 h-[500px] text-center">
          <h2 className="w-full mx-auto text-3xl font-medium md:text-5xl md:w-2/3">
            SELL & BUY PRODUCT IN EXPOZONE
          </h2>
          <p
            className={clsx(
              "text-xl md:text-2xl w-4/5 md:w-2/3 text-white mx-auto tracking-wider",
              patrickHand.className
            )}
          >
            Swift Solutions for Your Desires: Instant Money, Coveted Items.
            Embrace Abundance Now!
          </p>
          <Link
            href="/featured"
            className={clsx(
              "bg-black text-white py-2 px-5 rounded-sm w-1/2 lg:w-auto tracking-wider text-lg border-2 border-white ease-in-out duration-300 shadow-button",
              patrickHand.className
            )}
          >
            Get Started
          </Link>
        </div>
        <div className="bg-[#FCE700] w-full lg:w-1/2 h-[500px] flex justify-center my-auto relative">
          <Image
            src="/assets/landing-page/blob.svg"
            alt="..."
            width={500}
            height={500}
          />
          <Image
            src="/assets/landing-page/person.svg"
            alt="..."
            width={250}
            height={250}
            className="absolute top-10"
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col justify-center items-center py-10",
          patrickHand.className
        )}
      >
        <p className="text-2xl tracking-wider md:text-3xl">
          START YOUR JOURNEY!
        </p>
        <p className="flex px-3 text-lg text-center md:text-xl text-neutral-400">
          Unleash a Profitable Future: Launch Your Store Today, Reap Abundance
          Tomorrow! Let Success Follow Your Every Step.
        </p>
      </div>
      <div className="flex flex-col w-full border-black lg:flex-row border-y-2">
        <div className="flex flex-col items-center border-b-2 xl:border-b-0 lg:border-r-2 border-black justify-center bg-[#006E7F] w-full lg:w-1/2 h-[500px]">
          <div className="relative w-4/5 overflow-hidden bg-white border-2 md:w-2/3 h-3/4 group aspect-square border-neutral-200">
            <Image
              alt="warning new seller"
              src="/assets/landing-page/shopping.jpg"
              fill
              className="object-cover w-full h-full transition group-hover:scale-110"
            />
          </div>
        </div>
        <div className="bg-[#323232] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col gap-5 px-5 pt-16 text-white md:px-10">
            <p className="text-3xl font-medium tracking-wider md:text-4xl">
              HOW TO BECOME A SELLER?
            </p>
            <div className="flex flex-col gap-7">
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("md:text-lg", patrickHand.className)}>
                  Smart Steps, Big Rewards: Become a Seller with Confidence!
                  Start Small, Grow Big.
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Dip Your Toes First: Minimize Risks, Maximize Gains. Kickstart
                  Your Selling Journey!
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Win Hearts, Win Sales: Create Irresistible Products that
                  Captivate Customers!
                </p>
              </div>
              <div className="flex-row items-center hidden gap-2 md:flex">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Unleash Your Inner Entrepreneur: Sell Smarter, Not Harder!
                  Start Small, Scale Steadily, Prosper Endlessly.
                </p>
              </div>
              <div className="flex-row items-center hidden gap-2 md:flex">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Empower Your Selling Potential: Think Big, Act Bold! Elevate
                  Your Product&apos;s Allure and Witness Sales Soar!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex justify-center mx-auto text-2xl md:text-3xl py-10 tracking-wider w-4/5 md:w-3/4 text-center",
          patrickHand.className
        )}
      >
        “Discover the Gateway to Empowerment: Embrace Your Untapped Potential,
        Embark on an Exciting Ecommerce Adventure, and Witness Extraordinary
        Success Unfold. Take the Leap Now and Watch Your Dreams Flourish Beyond
        Imagination!”.
      </div>
      <div className="flex flex-col w-full border-black lg:flex-row border-y-2">
        <div className="flex flex-col border-b-2 xl:border-b-0 lg:border-r-2 border-black bg-[#F5C6EC] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative w-4/5 overflow-hidden bg-white border-2 shadow md:w-2/3 h-3/4 group aspect-square border-neutral-200">
              <Image
                alt="warning new seller"
                src="/assets/landing-page/video.jpg"
                fill
                className="object-cover w-full h-full transition group-hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="bg-[#AA77FF] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col gap-5 px-5 pt-16 text-white md:px-10">
            <p className="text-3xl font-medium tracking-wider md:text-4xl">
              SELL ANYTHING!
            </p>
            <p
              className={clsx(
                "text-lg md:text-xl font-medium tracking-wider",
                patrickHand.className
              )}
            >
              You can sell your product like video digital, design, physicall
              product, or your app if you are developer.
            </p>
            <div className="flex flex-col gap-2 tracking-wider">
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("md:text-lg", patrickHand.className)}>
                  Fashion
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>Design</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Software
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>Video</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Electronic
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>Games</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>Etc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col gap-5 justify-center mx-auto py-10 tracking-wider w-4/5 text-center",
          patrickHand.className
        )}
      >
        <p className="text-5xl tracking-wider md:text-6xl">1,450,290 +</p>
        <p className="text-2xl tracking-wider md:text-3xl">
          Expozone, a place where everyone can find everything. Join now!
        </p>
      </div>
      <div className="flex flex-col items-center gap-5 py-20 md:py-28 bg-[#23A094] text-white border-black border-y-2">
        <div className="flex flex-col items-center justify-center text-xl font-semibold tracking-wider md:text-4xl">
          <p>Share your product!</p>
          <p>For someone in need out there.</p>
        </div>
        <Link
          href="/login"
          className={clsx(
            "px-5 py-2 bg-black border border-white rounded-sm tracking-wider hover:scale-105 duration-100 ease-in-out",
            patrickHand.className
          )}
        >
          Start Selling
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
