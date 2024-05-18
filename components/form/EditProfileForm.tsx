"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardEditUser from "@/components/card/CardEditUser";
import UploadthingInput from "@/components/input/UploadthingInput";

import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ExtendedSession } from "@/next-auth";
import { editProfile } from "@/actions/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/lib/validations/user";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/actions/auth";

interface EditProfileFormProps {
  user: ExtendedSession;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo(
    () => ({
      name: user.name || "",
      image: user.image || "",
      email: user.email || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    }),
    [user]
  );

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: initialValues,
  });

  const imageWatch = form.watch("image");

  const { watch, handleSubmit, reset } = form;

  useEffect(() => {
    if (imageWatch) {
      form.setValue("image", imageWatch);
    }
  }, [imageWatch, form]);

  useEffect(() => {
    const subscription = watch((values) => {
      const isChanged =
        values.name !== initialValues.name ||
        values.image !== initialValues.image ||
        values.email !== initialValues.email ||
        values.isTwoFactorEnabled !== initialValues.isTwoFactorEnabled;
      setHasChanges(isChanged);
    });
    return () => subscription.unsubscribe();
  }, [watch, initialValues]);

  const onSubmit = async (values: z.infer<typeof EditProfileSchema>) => {
    startTransition(() => {
      editProfile(values).then((data) => {
        if (data?.error) {
          return toast.error(data.error);
        }
        if (data?.success) {
          router.refresh();
          reset(values);
          setHasChanges(!hasChanges);
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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
              className="flex items-center gap-2 w-fit"
              disabled={isPending || !hasChanges}
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

export default EditProfileForm;
