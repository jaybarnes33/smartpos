import { table } from "console";
import React from "react";
import { FaMapMarkerAlt, FaMapPin, FaUserAlt } from "react-icons/fa";

interface IOrder {
  id: number;
  customer: string;
  location: string;
  status: string;
  price: number;
}

const Item = ({ data }: { data: IOrder }) => {
  return (
    <div className="bg-white rounded p-4 shadow-md">
      <div className="flex justify-between pb-3 ">
        <div className="flex-1 flex gap-4">
          <span className="text-red-600 font-bold text-xl">
            {" "}
            Order #{data.id}
          </span>{" "}
          <span>{data.status}</span>
        </div>
        <span className="font-semibold text-neutral-900">GH ${data.price}</span>
      </div>
      <div className="flex justify-between pb-3">
        <div className="flex-1 gap-4">
          <div className="flex gap-1 items-center">
            <FaUserAlt color="grey" />: {data.customer}
          </div>
          <div className="flex gap-1 items-center">
            <FaMapMarkerAlt color="grey" />: {data.location}
          </div>
        </div>
        <span>
          {new Date().getUTCHours()}:{new Date().getUTCMinutes()}
        </span>
      </div>
    </div>
  );
};

export default Item;
