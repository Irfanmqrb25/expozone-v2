"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import { verifyEmail } from "@/actions/auth";
import { PulseLoader } from "react-spinners";

const VerificationEmail = () => {
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
        return toast.success(data.success);
      }
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-[450px] shadow-md dark:bg-[#0e1111]">
      <CardHeader className="text-center">
        <CardTitle>Verifying your email</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center w-full">
          {!success && !error && <PulseLoader color="#3C6DE9" size={15} />}
          {success && <div>Email Verification Success</div>}
          {error && <div>Email Verification Failed</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationEmail;
