import Image from "next/image";

import SubscribeInput from "@/components/input/SubscribeInput";

import { BsInstagram, BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 px-5 py-10 text-white bg-black md:px-9">
      <div className="text-2xl font-semibold tracking-wider md:text-4xl">
        EXPOZONE
      </div>
      <div className="flex flex-col justify-between gap-10 lg:flex-row">
        <div className="flex flex-col gap-5">
          <p className="text-lg font-normal tracking-wider md:text-xl">
            Subscribe to get more information about Expozone.
          </p>
          <SubscribeInput />
        </div>
        <div className="flex flex-row flex-wrap justify-center md:text-start lg:flex-col gap-7 md:gap-5 lg:gap-3 md:mr-16 md:grid md:grid-cols-2 lg:flex">
          <p>Help</p>
          <p>Blogs</p>
          <p>Pricing</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:justify-between md:flex-row md:gap-0">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/brand-logo.svg"
            alt="brand logo"
            width={40}
            height={40}
            className="border border-white w-[30px] md:w-[40px]"
          />
          <p className="text-lg font-medium">&copy; 2024 Expozone.</p>
        </div>
        <div className="flex flex-row mx-auto text-xl md:mx-0 md:text-2xl gap-7">
          <BsInstagram className="cursor-pointer" />
          <BsFacebook className="cursor-pointer" />
          <BsTwitter className="cursor-pointer" />
          <BsLinkedin className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
