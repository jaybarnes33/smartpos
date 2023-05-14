import { IOrder, Order } from "@/types/order";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { toast } from "react-toastify";

export const handleAdd = async (order: IOrder) => {
  try {
    const { message, order: data } = await makeSecuredRequest(
      "/api/orders",
      "POST",
      order
    );
    toast.success(message);
    return data;
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};

export const fetchOrders: () => Promise<Order[]> = async () => {
  try {
    const { orders } = await makeSecuredRequest("/api/orders");
    return orders;
  } catch (error) {
    toast.error("Something went wrong, couldn't fetch orders");
  }
};
