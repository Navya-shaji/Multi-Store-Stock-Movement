import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  async function fetchProducts() {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }

    fetchProducts();
  }, []);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;