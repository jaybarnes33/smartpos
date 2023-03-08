import { useModalWithData } from "@/hooks/useModal";

import { User } from "@/types/user";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { toast } from "react-toastify";

export const handleAdd = async (user: User) => {
  try {
    const { message } = await makeSecuredRequest("/api/users", "POST", user);
    toast.success(message);
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};

export const handleDelete = async (id: string) => {
  try {
    const { message } = await makeSecuredRequest(`/api/users/${id}`, "DELETE");
    toast.success(message);
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};

export const handleEdit = async (user: User, id: string) => {
  try {
    const { message } = await makeSecuredRequest(
      `/api/users/${id}`,
      "PUT",
      user
    );
    toast.success(message);
  } catch (error) {
    toast.error("Something went wrong, please try again");
  }
};
