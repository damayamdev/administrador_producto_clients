import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvaulability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductAvaulability(+data.id)
  return {}
}

const Products = () => {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 hover:bg-indigo-500 p-3 text-sm font-bold text-white shadow-sm"
        >
          Agregar Productos
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2 text-justify">Producto</th>
              <th className="p-2 text-justify">Precio</th>
              <th className="p-2 text-justify">Disponibilidad</th>
              <th className="p-2 text-justify">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
                <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
