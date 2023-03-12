import { fetchOrders } from "@/components/Bill/controllers";
import IconButton from "@/components/Buttons/IconButton";

import { useDash } from "@/hooks/useDash";
import { Order } from "@/types/order";
import React, { useEffect, useState } from "react";
import Item from "./Item";

const Orders = () => {
  const { toggle } = useDash();
  const [orders, setOrders] = useState<Order[] | undefined>();
  useEffect(() => {
    (async () => {
      const data = await fetchOrders();
      setOrders(data);
    })();
  }, []);
  return (
    <div className="grid gap-4 px-4 pt-5">
      <div className="flex justify-between">
        <h1 className="text-2xl  font-bold text-neutral-800 dark:text-yellow-600">
          Recent Purchases
        </h1>
        <IconButton icon="+" action={toggle} />
      </div>

      <div className="flex flex-col gap-4  max-h-[77vh] overflow-y-scroll">
        {orders?.map((order) => (
          <Item data={order} key={order._id} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
