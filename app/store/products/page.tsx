import ProductTable from "@/components/table/ProductTable";

import getStore from "@/actions/getStore";
import getProductByStore from "@/actions/getProductByStore";

const ProductsPage = async () => {
  const productData = await getProductByStore();
  const store = await getStore();

  return <ProductTable store={store!} productData={productData} />;
};

export default ProductsPage;
