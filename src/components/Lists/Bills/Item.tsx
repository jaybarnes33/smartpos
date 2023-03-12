import { Order } from "@/types/order";
import { table } from "console";
import React from "react";
import {
  FaCheckDouble,
  FaHourglassStart,
  FaMapMarkerAlt,
  FaMapPin,
  FaUserAlt,
} from "react-icons/fa";

interface IOrder {
  id: number;
  customer: string;
  location: string;
  status: string;
  price: number;
}

const Item = ({ data }: { data: Order }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded p-4 shadow-md">
      <div className="flex justify-between pb-3 ">
        <div className="flex-1 flex gap-4 relative">
          <span className="text-red-600 font-bold  text-xs">#{data._id}</span>{" "}
          <span className="text-sm absolute text-green-500 right-2">
            {" "}
            {data.status === "pending" ? (
              <FaHourglassStart />
            ) : (
              <FaCheckDouble />
            )}
          </span>
        </div>
        {/* <span className="font-semibold text-neutral-900">GH ${data.price}</span> */}
      </div>
      <div className="flex justify-between pb-3">
        <div className="flex-1 gap-4">
          <span className="text-sm">{data?.createdAt}</span>
          <div className="flex gap-1 items-center">
            <FaUserAlt color="grey" />: {data?.customer?.name}
          </div>
          <div className="flex gap-1 items-center">
            <FaMapMarkerAlt color="grey" />: {data?.customer?.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
