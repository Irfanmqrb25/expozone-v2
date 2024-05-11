"use client";

import { useForm } from "react-hook-form";
import AuthCard from "../card/AuthCard";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState, useTransition } from "react";
import * as z from "zod";
import { SignInSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { PasswordInput } from "../input/PasswordInput";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/actions/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const SignInForm = () => {
  const params = useSearchParams();
  const callbackUrl = params?.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      toast.promise(
        signIn(values, callbackUrl)
          .then((data) => {
            if (data?.error) {
              form.reset();
              return toast.error(data.error);
            }
            if (data?.success) {
              form.reset();
              return toast.success(data.success);
            }
            if (data?.twoFactor) {
              setShowTwoFactor(true);
            }
          })
          .catch(() => {
            return toast.error("Something went wrong");
          })
      );
    });
  };

  return (
    <AuthCard
      title="Masuk"
      description="Masuk ke dalam akun anda!"
      backButton="Belum memiliki akun? Daftar."
      backButtonLink="/auth/sign-up"
      showSocialAuth
    >
      <Form {...form}>
        <form
          className="h-full space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="w-full">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} className="w-full" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Masukkan kode verifikasi dua langkah yang dikirimkan ke
                    email!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="**********"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Konfirmasi" : "Masuk"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SignInForm;
