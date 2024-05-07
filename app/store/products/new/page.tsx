import FormProduct from "./FormProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddProductPage = async () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Tambahkan Produk Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProduct />
      </CardContent>
    </Card>
  );
};

export default AddProductPage;
