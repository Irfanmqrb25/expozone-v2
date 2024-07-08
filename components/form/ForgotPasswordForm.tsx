"use client";

import { useTransition } from "react";

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
import AuthCard from "../card/AuthCard";

import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/lib/validations/auth";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(() => {
      resetPassword(values).then((data) => {
        if (data?.error) {
          return toast.error(data.error);
        }
        if (data?.success) {
          form.reset();
          return toast.success(data.success);
        }
      });
    });
  };
  return (
    <AuthCard
      title="Lupa Password?"
      description="Masukkan alamat email akun anda untuk mengatur ulang kata sandi"
      backButton="Kembali ke Login"
      backButtonLink="/auth/sign-in"
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
          <Button
            type="submit"
            className="flex items-center w-full gap-2"
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Kirim
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default ForgotPasswordForm;
