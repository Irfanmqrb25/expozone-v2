"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { verifyEmail } from "@/actions/auth";

const VerificationEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token tidak ditemukan!");
      return toast.error("Token tidak ditemukan!");
    }
    verifyEmail(token).then((data) => {
      if (data?.error) {
        setError(data.error);
        return toast.error(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/sign-in");
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
          <CardTitle>Memverifikasi Email</CardTitle>
          <Image
            src="/waiting-verification.webp"
            alt="logo"
            width={200}
            height={200}
            className={cn(!success && !error && "animate-pulse")}
          />
          {success && (
            <p className="font-medium text-green-500">
              Email berhasil di verifikasi
            </p>
          )}
          {error && (
            <p className="font-medium text-red-500">
              Email gagal di verifikasi
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationEmail;
