"use client";

import { useForm } from "react-hook-form";
import AuthCard from "../card/AuthCard";
import {
  Form,
  FormControl,
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
      title="Sign in"
      description="Enter to your account!"
      backButton="Don't have an account? Sign Up."
      backButtonLink="/auth/sign-up"
      showSocialAuth
    >
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign in
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SignInForm;
