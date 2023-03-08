import { useModalWithData } from "@/hooks/useModal";
import { Product } from "@/types/item";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { toast } from "react-toastify";

export const handleAdd = async (product: {
  name: string;
  description: string;
  cost_price: number;
  selling_price: number;
}) => {
  console.log(product);
  try {
    const { message } = await makeSecuredRequest(
      "/api/products",
      "POST",
      product
    );
    toast.success(message);
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};

export const search = async (keyword: string) => {
  try {
    const { products } = await makeSecuredRequest(
      `/api/products?keyword=${keyword}`,
      "GET"
    );
    return products;
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};
export const handleDelete = async (id: string) => {
  try {
    const { message } = await makeSecuredRequest(
      `/api/products/${id}`,
      "DELETE"
    );
    toast.success(message);
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};

export const handleEdit = async (
  product: {
    name: string;
    description: string;
    cost_price: number;
    selling_price: number;
  },
  id: string
) => {
  try {
    const { message } = await makeSecuredRequest(
      `/api/products/${id}`,
      "PUT",
      product
    );
    toast.success(message);
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};
