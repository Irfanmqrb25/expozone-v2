import { Fredoka } from "next/font/google";

import clsx from "clsx";
import { BsArrowRight } from "react-icons/bs";

const fredoka = Fredoka({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

const SubscribeInput = () => {
  return (
    <div className="flex flex-row items-center">
      <input
        placeholder="Your email adress..."
        className={clsx(
          "w-full h-[45px] pl-2 text-black focus:outline-none",
          fredoka.className
        )}
      />
      <button className="bg-[#23A094] text-3xl px-3 py-2 border-l-2 border-black">
        <BsArrowRight />
      </button>
    </div>
  );
};

export default SubscribeInput;
