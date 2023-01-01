import IconButton from "@/components/Buttons/IconButton";
import orders from "@/data/orders";
import { useDash } from "@/hooks/useDash";
import React from "react";
import Item from "./Item";

const Orders = () => {
  const { toggle } = useDash();
  return (
    <div className="grid gap-4 px-4 pt-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">
          Recent Purchases
        </h1>
        <IconButton icon="+" action={toggle} />
      </div>

      <div className="flex flex-col gap-4  max-h-[77vh] overflow-y-scroll">
        {[...orders, ...orders].map((order, index) => (
          <Item data={{ id: index + 1, ...order }} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
