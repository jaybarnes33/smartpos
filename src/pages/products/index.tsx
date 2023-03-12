import Input from "@/components/core/Input";
import Modal from "@/components/core/Modal";
import LayoutWithSide from "@/components/Layout/LayoutWithSide";
import Add from "@/components/Products/Forms/Add";
import Delete from "@/components/Products/Forms/Delete";
import Edit from "@/components/Products/Forms/Edit";

import { useModalWithData } from "@/hooks/useModal";
import { Product } from "@/types/item";
import makeSecuredRequest from "@/utils/makeSecuredRequest";

import React, { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toggle, setSelected } = useModalWithData();
  useEffect(() => {
    (async () => {
      const { products: data } = await makeSecuredRequest("/api/products");

      setProducts(data);
    })();
  }, []);
  return (
    <LayoutWithSide>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-yellow-600">Products</h1>

        <div className="relative px-4">
          <button
            onClick={() => {
              setSelected(<Add />);
              toggle();
            }}
            className="flex items-center gap-2 bg-primary text-white px-2 rounded-full absolute right-3 -top-[3rem] py-2"
          >
            Add <FaPlusCircle />
          </button>
          <table className="w-full text-sm text-left text-gray-500 mt-3">
            <thead className="text-xs text-white uppercase bg-slate-300 rounded font-extrabold">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  quantiy
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item) => (
                <tr
                  key={item.id}
                  className={`bg-white  text-gray-900 border hover:bg-slate-200 `}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border ">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 border">{item.selling_price}</td>
                  <td className="px-6 py-4 border">{item.quantity}</td>
                  <td className="flex gap-2 justify-center  items-center py-4">
                    <FaEdit
                      onClick={() => {
                        setSelected(<Edit data={item} />);
                        toggle();
                      }}
                    />
                    <FaTrash
                      onClick={() => {
                        setSelected(<Delete data={item} />);
                        toggle();
                      }}
                    />
                  </td>

                  {/* <td className="px-6 py-4">{item.level}</td>
                <td className="px-6 py-4">{item.campus}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutWithSide>
  );
};

export default Products;
