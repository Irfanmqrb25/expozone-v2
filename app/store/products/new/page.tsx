import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormProduct from "./FormProduct";

const AddProductPage = async () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProduct />
      </CardContent>
    </Card>
  );
};

export default AddProductPage;
