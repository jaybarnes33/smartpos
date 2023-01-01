import { Item } from "@/types/item";
import React from "react";

const Listing = ({ item }: { item: Item }) => {
  return (
    <div className="bg-neutral-50 my-3 p-2 text-xl rounded flex justify-between hover:scale-105 transition-all">
      <span className="capitalize font-bold">{item.name}</span>
      <span className="text-yellow-600 font-semibold">
        GHS &nbsp;{item.price}
      </span>
    </div>
  );
};

export default Listing;
