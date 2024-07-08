"use client";

import { useTransition } from "react";
import { redirect, useSearchParams, useRouter } from "next/navigation";

import { Button } from "../ui/button";
import AuthCard from "../card/AuthCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../input/PasswordInput";

import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { newPassword } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/lib/validations/auth";

const ResetPasswordForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  if (!token) return redirect("/auth/sign-in");

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      toast.promise(
        newPassword(data, token).then((data) => {
          if (data?.error) {
            return toast.error(data.error);
          }
          if (data?.success) {
            form.reset();
            router.push("/auth/sign-in");
            return toast.success(data.success);
          }
        })
      );
    });
  };

  return (
    <AuthCard
      title="Reset Password"
      description="Masukkan password baru untuk mengatur ulang kata sandi"
      backButton="Kembali ke Login"
      backButtonLink="/auth/sign-in"
    >
      <Form {...form}>
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="******"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Konfirmasi Password Baru</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="******" {...field} />
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
            Konfirmasi
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default ResetPasswordForm;
