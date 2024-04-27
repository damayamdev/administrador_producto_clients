import {
  useNavigate,
  Form,
  ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const isAvailable = product.availability;
  const fetcher = useFetcher()
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="p-3 text-justify text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-justify text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-justify text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-sm uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-justify text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`productos/${product.id}/editar`)}
            className="bg-indigo-600 text-white rounded-lg p-2 uppercase font-bold text-xs text-center"
          >
            <PencilIcon className="w-5" />
          </button>
          <Form
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Eliminar?")) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="bg-red-600 text-white rounded-lg p-2 uppercase font-bold text-xs text-center"
            >
              <TrashIcon className="w-5" />
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
