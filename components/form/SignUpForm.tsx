"use client";

import { useTransition } from "react";

import AuthCard from "../card/AuthCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PasswordInput } from "../input/PasswordInput";

import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { signUp } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    startTransition(async () => {
      toast.promise(
        signUp(data).then((data) => {
          if (data?.error) {
            return toast.error(data.error);
          }
          if (data?.success) {
            form.reset();
            return toast.success(data.success);
          }
        })
      );
    });
  };

  return (
    <AuthCard
      title="Daftar Sekarang"
      description="Buat akun baru!"
      backButton="Sudah memiliki akun? Masuk."
      backButtonLink="/auth/sign-in"
      showSocialAuth
    >
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button
            type="submit"
            className="flex items-center w-full gap-2"
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Daftar
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SignUpForm;
