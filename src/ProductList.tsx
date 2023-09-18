import { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("====================================");
    console.log("Fetching product in ", category);
    console.log("====================================");
    setProducts(["Guns", "Roses"]);
  }, [category]);

  return (
    <>
      <div>ProductList</div>
    </>
  );
};
export default ProductList;
