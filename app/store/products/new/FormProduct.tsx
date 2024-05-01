"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import CurrencyInput from "react-currency-input-field";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link2, Loader2 } from "lucide-react";
import { productCategories } from "@/lib/data";
import { HiComputerDesktop, HiLink } from "react-icons/hi2";
import { ProductSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";

const FormProduct = () => {
  const router = useRouter();
  const [uploadWithLink, setUploadWithLink] = useState(false);
  const [uploadFromComputer, setUploadFromComputer] = useState(false);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [],
      name: "",
      category: "",
      price: 0,
      description: "",
      productAssets: [],
      isFeatured: false,
    },
  });

  const productAssetWatch = form.watch("productAssets");
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    try {
      if (typeof data.productAssets === "string") {
        data.productAssets = [
          { name: "External URL", url: data.productAssets },
        ];
      }

      await axios.post("/api/product", data);
      router.refresh();
      router.push("/store/products");
      toast.success("Produk has been added.");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Image</FormLabel>
                <p className="text-sm text-muted-foreground">
                  maximum of 3 images allowed
                </p>
              </div>
              <FormControl>
                <FileUpload
                  endpoint="productImageUpload"
                  onChange={field.onChange}
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter(
                        (currentUrl: string) => currentUrl !== url
                      ),
                    ])
                  }
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Product Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productCategories.map((category, i) => (
                    <SelectItem key={i} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <CurrencyInput
                  disabled={isLoading}
                  prefix="Rp. "
                  className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Rp. 0"
                  decimalsLimit={2}
                  groupSeparator="."
                  decimalSeparator=","
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Product description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  disabled={isLoading}
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Check if you want this product to be featured in your store.
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormLabel>Asset</FormLabel>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant={uploadWithLink ? "secondary" : "outline"}
              className="flex items-center w-full gap-2"
              type="button"
              disabled={
                productAssetWatch.length > 0 &&
                typeof productAssetWatch !== "string"
              }
              onClick={() => {
                setUploadWithLink(!uploadWithLink);
                setUploadFromComputer(false);
              }}
            >
              <HiLink className="w-4 h-4" />
              Upload File With Link
            </Button>
            <span>or</span>
            <Button
              size="sm"
              disabled={
                typeof productAssetWatch === "string" &&
                productAssetWatch.length !== 0
              }
              variant={uploadFromComputer ? "secondary" : "outline"}
              className="flex items-center w-full gap-2"
              type="button"
              onClick={() => {
                setUploadWithLink(false);
                setUploadFromComputer(!uploadFromComputer);
              }}
            >
              <HiComputerDesktop className="w-4 h-4" />
              Upload File From Computer
            </Button>
          </div>
          {uploadWithLink && (
            <div className="relative">
              <Link2 className="absolute w-5 h-5 top-[11px] left-2 text-muted-foreground" />
              <FormField
                control={form.control}
                name="productAssets"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="type your url asset here..."
                        className="pl-8"
                        value={field.value as any}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {uploadFromComputer && (
            <FormField
              control={form.control}
              name="productAssets"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endpoint="productAssetUpload"
                      value={field.value as any}
                      onChange={(data) => field.onChange([...data])}
                      onRemove={(url) => {
                        if (Array.isArray(field.value)) {
                          field.onChange([
                            ...field.value.filter(
                              (current: any) => current.url !== url
                            ),
                          ]);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
        <Button type="submit" className="flex items-center w-full gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormProduct;
