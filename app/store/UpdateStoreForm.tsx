"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStoreSchema } from "@/lib/validations/store";
import UploadthingInput from "@/components/input/UploadthingInput";

const UpdateStoreForm = ({ store }: { store: any }) => {
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const form = useForm<z.infer<typeof UpdateStoreSchema>>({
    resolver: zodResolver(UpdateStoreSchema),
    defaultValues: {
      name: store.name,
      image: store.image || "/blank-user.jpg",
      email: store.email,
      country: store.country,
      city: store.city,
      address: store.address,
      description: store.description,
    },
  });

  const imageWatch = form.watch("image");
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (imageWatch) {
      form.setValue("image", imageWatch);
    }
  }, [imageWatch, form]);

  const onSubmit = async (data: z.infer<typeof UpdateStoreSchema>) => {
    try {
      await axios.put(`/api/store`, data);
      router.refresh();
      toast.success("Profil toko berhasil diperbarui.");
    } catch (error) {
      toast.error("Terjadi kesalahan.");
    }
  };

  const handleDeleteStore = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete("/api/store");
      router.refresh();
      toast.success("Toko anda telah di hapus.");
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <Card className="w-full border-2 border-black my-shadow bg-slate-100">
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Edit Toko</CardTitle>
        <CardDescription>
          Anda dapat mengedit dan menghapus toko.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FormLabel>Nama Toko</FormLabel>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>Negara</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>Kota</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              {isLoading ? (
                <Button disabled={isLoading} className="w-full">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Simpan
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild className="w-full">
                  <Button variant="destructive" disabled={isLoading}>
                    Hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah anda yakin ingin menghapus toko ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Ini akan menghapus akun toko anda secara permanen dan
                      menghapus semua datanya dari server kami.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                      Batal
                    </AlertDialogCancel>
                    {loadingDelete ? (
                      <AlertDialogAction disabled={isLoading}>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Tunngu ...
                      </AlertDialogAction>
                    ) : (
                      <AlertDialogAction onClick={handleDeleteStore}>
                        Hapus
                      </AlertDialogAction>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateStoreForm;
