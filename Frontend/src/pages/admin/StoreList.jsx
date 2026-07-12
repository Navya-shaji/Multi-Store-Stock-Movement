import { useEffect, useState } from "react";
import { getAllStore } from "../../services/api";

function StoreList() {
  const [store, setStore] = useState([]);
 useEffect(() => {
  async function fetchProducts() {
    try {
      const data = await getAllStore();
      setStore(data.products);
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
            <th>Store Name</th>
          </tr>
        </thead>

        <tbody>
          {store.map((store) => (
            <tr key={store._id}>
              <td>{store.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoreList;