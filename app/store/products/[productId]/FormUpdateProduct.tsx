"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CurrencyInput from "react-currency-input-field";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link2, Loader2 } from "lucide-react";
import { productCategories } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductAsset } from "@prisma/client";
import { ProductSchema } from "@/lib/validations/product";
import { HiComputerDesktop, HiLink } from "react-icons/hi2";

interface FormUpdateProductProps {
  data: Product & {
    productAssets: ProductAsset[];
  };
}

const FormUpdateProduct: React.FC<FormUpdateProductProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [uploadWithLink, setUploadWithLink] = useState(false);
  const [uploadFromComputer, setUploadFromComputer] = useState(false);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: data.images,
      name: data.name,
      category: data.category,
      price: Number(data.price),
      isFeatured: data.isFeatured,
      description: data.description,
      productAssets:
        data.productAssets[0].name === "External URL"
          ? data.productAssets[0].url
          : data.productAssets.map((asset) => ({
              url: asset.url,
              name: asset.name || "",
              size: asset.size || 0,
            })),
    },
  });

  const productAssetWatch = form.watch("productAssets");

  const onUpdate = async (data: z.infer<typeof ProductSchema>) => {
    try {
      await axios.patch(`/api/product/${params.productId}`, data);
      router.refresh();
      router.push("/store/products");
      toast.success("Data produk telah diperbarui.");
      form.reset();
    } catch (error) {
      toast.error("Terjadi kesalahan.");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onUpdate)}>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Gambar Produk</FormLabel>
                <p className="text-sm text-muted-foreground">
                  maksimal 3 gambar untuk diunggah.
                </p>
              </div>
              <FormControl>
                <FileUpload
                  endpoint="productImageUpload"
                  onChange={(url) =>
                    field.value
                      ? field.onChange([...field.value, ...url])
                      : field.onChange([...url])
                  }
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
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
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
              <FormLabel>Kategori Produk</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori Produk" />
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
              <FormLabel>Harga Produk</FormLabel>
              <FormControl>
                <CurrencyInput
                  prefix="Rp. "
                  className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Rp. 0"
                  decimalsLimit={2}
                  groupSeparator="."
                  decimalSeparator=","
                  value={field.value}
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
              <FormLabel>Deskripsi Produk</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
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
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Ceklis untuk memfiturkan produk ini pada toko anda.
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormLabel>Aset Produk</FormLabel>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              disabled={
                productAssetWatch.length > 0 &&
                typeof productAssetWatch !== "string"
              }
              variant={uploadWithLink ? "secondary" : "outline"}
              className="flex items-center w-full gap-2"
              type="button"
              onClick={() => {
                setUploadWithLink(!uploadWithLink);
                setUploadFromComputer(false);
              }}
            >
              <HiLink className="w-4 h-4" />
              Unggah Menggunakan External Link
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
              Unggah File Dari Komputer
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
                        placeholder="masukkan link penyimpanan aset anda..."
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
        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </form>
    </Form>
  );
};

export default FormUpdateProduct;
