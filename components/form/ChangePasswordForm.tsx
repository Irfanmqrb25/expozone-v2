"use client";

import { useEffect, useState, useTransition } from "react";

import CardEditUser from "@/components/card/CardEditUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/input/PasswordInput";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { changePassword } from "@/actions/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "@/lib/validations/user";
import { Loader2 } from "lucide-react";

const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isFormChanged, setIsFormChanged] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() => {
      changePassword(data).then((data) => {
        if (data.error) {
          form.reset({
            password: "",
            newPassword: "",
            confirmPassword: "",
          });
          return toast.error(data.error);
        }
        if (data.success) {
          form.reset({
            password: "",
            newPassword: "",
            confirmPassword: "",
          });
          return toast.success(data.success);
        }
      });
    });
  };

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      const { password, newPassword, confirmPassword } = value;
      const isChanged =
        password?.length !== 0 &&
        newPassword?.length !== 0 &&
        confirmPassword?.length !== 0;
      setIsFormChanged(isChanged);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <CardEditUser
      title="Ubah Password"
      description="Anda dapat mengubah password akun anda disini."
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Saat Ini</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="******"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              className="flex items-center gap-2 w-fit"
              disabled={isPending || !isFormChanged}
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </CardEditUser>
  );
};

export default ChangePasswordForm;
