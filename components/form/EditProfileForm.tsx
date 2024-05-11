"use client";

import { useEffect, useTransition } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardEditUser from "@/components/card/CardEditUser";
import UploadthingInput from "@/components/input/UploadthingInput";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ExtendedSession } from "@/next-auth";
import { editProfile } from "@/actions/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/lib/validations/user";
import { Switch } from "../ui/switch";

interface EditProfileFormProps {
  user: ExtendedSession;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || undefined,
      image: user.image || undefined,
      email: user.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const imageWatch = form.watch("image");

  useEffect(() => {
    if (imageWatch) {
      form.setValue("image", imageWatch);
    }
  }, [imageWatch, form]);

  const onSubmit = async (values: z.infer<typeof EditProfileSchema>) => {
    startTransition(() => {
      editProfile(values).then((data) => {
        if (data?.error) {
          return toast.error(data.error);
        }
        if (data?.success) {
          return toast.success(data.success);
        }
      });
    });
  };

  return (
    <CardEditUser
      title="Profile Saya"
      description="Anda dapat mengedit profil di sini."
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadthingInput
                    value={field.value!}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={user.isOAuth === true || isPending ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user.isOAuth === false && (
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Verifikasi Dua Langkah</FormLabel>
                    <FormDescription>
                      Aktifkan fitur verifikasi dua langkah untuk keamanan akun
                      anda
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <div className="flex items-center justify-end">
            <Button type="submit" disabled={isPending}>
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </CardEditUser>
  );
};

export default EditProfileForm;
