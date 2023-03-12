import LayoutWithSide from "@/components/Layout/LayoutWithSide";
import { Order } from "@/types/order";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import router from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
const Pending = () => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const { status } = router.query;
    setQuery(status as string);
  }, [setQuery]);
  const { data } = useSWR(
    query ? `/api/orders?status=${query}` : `/api/orders`,
    makeSecuredRequest
  );

  return (
    <LayoutWithSide>
      <h1 className="font-bold text-2xl text-yellow-600">
        {query === "pending" ? "Pending Deliveries" : "Orders"}
      </h1>

      <table className="w-full text-sm text-left text-gray-500 mt-3">
        <thead className="text-xs text-white uppercase bg-slate-300 rounded font-extrabold">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data?.orders?.map((item: Order) => (
            <tr
              key={item._id}
              className={`bg-white  text-gray-900 border hover:bg-slate-200 `}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border ">
                {item.createdAt}
              </td>
              <td className="px-6 py-4 border">{item.customer.name}</td>
              <td className="px-6 py-4 border">{item.customer.location}</td>
              <td className="px-6 py-4 border">{item.total}</td>{" "}
              <td className="px-6 py-4 border">{item.status}</td>
              {/* <td className="px-6 py-4">{item.level}</td>
                <td className="px-6 py-4">{item.campus}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutWithSide>
  );
};

export default Pending;
