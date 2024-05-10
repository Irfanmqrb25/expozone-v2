"use client";

import { Product } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ReviewSchema } from "@/lib/validations/review";
import { startTransition } from "react";
import { toast } from "sonner";
import { addReview } from "@/actions/review";
import { Loader2 } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ReviewModal = ({ isOpen, onClose, product }: ReviewModalProps) => {
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ReviewSchema>, productId: string) => {
    startTransition(() => {
      toast.promise(
        addReview(data, productId).then((data) => {
          if (data?.error) {
            return toast.error(data.error);
          }
          if (data?.success) {
            form.reset();
            onClose();
            return toast.success(data.success);
          }
        })
      );
    });
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Berikan Ulasan</DialogTitle>
          <DialogDescription>
            Ulasan anda akan sangat bermanfaat untuk toko
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Image
              src={product.images?.[0]}
              alt="product image"
              width={64}
              height={64}
              className="object-cover rounded-md"
            />
            <p className="text-sm font-medium md:text-base">{product.name}</p>
          </div>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit((data) => onSubmit(data, product.id))}
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Masukkan ulasan anda"
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="flex items-center w-full gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Kirim
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
