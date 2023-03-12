import { useBill } from "@/hooks/useBill";
import { Product } from "@/types/item";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import QuantitySelector from "./QuantitySelector";

const Item = ({ item }: { item: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const { remove } = useBill();
  return (
    <div className="flex justify-between items-center py-2 px-2 bg-neutral-50 dark:bg-neutral-800 rounded my-2">
      <div className="w-full grid grid-cols-2 items-center">
        <p>{item.name}</p>
        <p className="text-center">{quantity * item.selling_price}</p>
      </div>
      <div className="flex gap-2 items-center">
        <QuantitySelector
          id={item._id}
          quantity={quantity}
          setQuantity={setQuantity}
          max={item.quantity}
        />
        <FaTrashAlt
          className="text-xs text-red-500 cursor-pointer transition-transform hover:scale-125"
          onClick={() => remove(item._id)}
        />
      </div>
    </div>
  );
};

export default Item;
