import { Item } from "@/types/item";
import React from "react";

const Listing = ({ item }: { item: Item }) => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 my-3 p-2 text-md rounded gap-2 flex justify-between hover:scale-105 transition-all items-center">
      <div className="capitalize">{item.name}</div>
      <div className="text-md text-left font-bold ">
        GHS{item.selling_price}
      </div>
    </div>
  );
};

export default Listing;
