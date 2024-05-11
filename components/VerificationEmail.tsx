"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import { verifyEmail } from "@/actions/auth";
import { PulseLoader } from "react-spinners";
import Image from "next/image";
import { cn } from "@/lib/utils";

const VerificationEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return toast.error("Missing token!");
    }
    verifyEmail(token).then((data) => {
      if (data?.error) {
        setError(data.error);
        return toast.error(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/featured");
        return toast.success(data.success);
      }
    });
  }, [token, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-[450px] shadow-md dark:bg-[#0e1111]">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center w-full space-y-4 h-[350px]">
          <CardTitle>Verifying your email...</CardTitle>
          <Image
            src="/waiting-verification.webp"
            alt="logo"
            width={200}
            height={200}
            className={cn(!success && !error && "animate-pulse")}
          />
          {success && (
            <p className="font-medium text-green-500">Verification Success</p>
          )}
          {error && (
            <p className="font-medium text-red-500">Verification Failed</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationEmail;
