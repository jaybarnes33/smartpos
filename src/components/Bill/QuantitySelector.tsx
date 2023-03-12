import { useBill } from "@/hooks/useBill";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";

const QuantitySelector = ({
  max,
  quantity,
  setQuantity,
  id,
}: {
  max: number;
  id: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const { handleQuantity } = useBill();
  return (
    <div className="flex gap-3 items-center text-sm">
      <FaMinusCircle
        className="text-xs cursor-pointer transition-transform hover:scale-125 text-slate-700"
        onClick={() => {
          quantity > 1 && setQuantity(quantity - 1);
          quantity > 1 && handleQuantity(id, quantity - 1);
        }}
      />
      <input
        className="w-20 text-center bg-neutral-100 rounded dark:text-neutral-800 "
        type="number"
        value={quantity}
        onFocus={(event) => {
          if (!event.target.valueAsNumber) event.target.select();
        }}
        onChange={(event) => {
          const {
            target: { valueAsNumber: value },
          } = event;
          console.log({ value }, isNaN(value));
          if (!value || isNaN(value)) {
            event.target.select();
            setQuantity(0);
          }
          if (value > 0 && value <= max) {
            console.log({ value, max });
            setQuantity(value);
          }
        }}
        max={max}
      />{" "}
      <FaPlusCircle
        className="text-xs cursor-pointer transition-transform hover:scale-125 text-slate-700"
        onClick={() => {
          quantity < max && setQuantity(quantity + 1);
          quantity < max && handleQuantity(id, quantity + 1);
        }}
      />
    </div>
  );
};

export default QuantitySelector;
