"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

const SocialAuthButton = () => {
  return (
    <Button
      onClick={() => signIn("google")}
      className="flex justify-between w-full text-black bg-white border hover:bg-white hover:border-neutral-500 border-neutral-300"
    >
      <FcGoogle className="text-xl" />
      <span className="mx-auto">Google</span>
    </Button>
  );
};

export default SocialAuthButton;
