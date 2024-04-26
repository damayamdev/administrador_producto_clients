import {useNavigate} from 'react-router-dom'
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const isAvailable = product.availability;

  const navigate = useNavigate()

  return (
    <tr className="border-b">
      <td className="p-3 text-justify text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-justify text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-justify text-lg text-gray-800">
        {isAvailable ? "Disponible" : "No Disponible"}
      </td>
      <td className="p-3 text-justify text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button onClick={() => navigate(`productos/${product.id}/editar`)} className="bg-indigo-600 text-white rounded-lg p-2 uppercase font-bold text-xs text-center">
            <PencilIcon className='w-5'/>
          </button>
          <button onClick={() => navigate(`productos/${product.id}/editar`)} className="bg-red-600 text-white rounded-lg p-2 uppercase font-bold text-xs text-center">
            <TrashIcon className='w-5'/>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
