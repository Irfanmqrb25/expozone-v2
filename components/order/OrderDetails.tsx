"use client";

import Image from "next/image";

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { rupiahFormat } from "@/lib/utils";
import { OrderItemForDetails } from "@/types";
import { Download, FolderCheck } from "lucide-react";

interface OrderDetailsProps {
  data: OrderItemForDetails[];
}

const OrderDetails = ({ data }: OrderDetailsProps) => {
  const totalPrice = data.reduce((total, item) => {
    return total + Number(item.product.price);
  }, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
        <div className="md:col-span-4 lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] hidden md:table-cell">
                      Image
                    </TableHead>
                    <TableHead className="max-w-[150px]">Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell className="w-[80px] hidden md:table-cell">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={80}
                          height={80}
                        />
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <p className="line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          by {item.product.store.name}
                        </p>
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        {rupiahFormat(Number(item.product.price))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Card className="md:col-span-4 lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {data.map((item) => (
              <div className="flex items-center" key={item.product.id}>
                <div>x1</div>
                <div className="ml-auto">
                  {rupiahFormat(Number(item.product.price))}
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex items-center font-medium">
              <div>Total</div>
              <div className="ml-auto">{rupiahFormat(totalPrice)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="px-8 py-6 space-y-10">
        <CardHeader className="p-0">
          <CardTitle className="">Assets</CardTitle>
          <CardDescription>Download your assets below!</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          {data.map((item) =>
            item.product.productAssets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 border-2 border-black rounded-md">
                    <FolderCheck size={24} />
                  </div>
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">
                      by {item.product.store.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(asset.url, "_blank")}
                >
                  <Download size={16} />
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default OrderDetails;
