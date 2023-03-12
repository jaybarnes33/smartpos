import Input from "@/components/core/Input";
import { useModalWithData } from "@/hooks/useModal";
import { handleEdit } from "@/components/Users/controllers";
import { Item, Product } from "@/types/item";
import { Dialog } from "@headlessui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IUser, User } from "@/types/user";
import { toast } from "react-toastify";

const Edit = ({ data }: { data: IUser }) => {
  const [user, setUser] = useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    setUser(data);
  }, [data]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const { toggle } = useModalWithData();
  return (
    <>
      <Dialog.Title className="text-xl font-bold">Edit User</Dialog.Title>
      <form
        className="px-2"
        onSubmit={(e) => {
          e.preventDefault();
          user.confirm_password === user.password
            ? handleEdit(user, data._id)
            : toast.error("Passwords don't match");
          toggle();
        }}
      >
        <Input
          label="name"
          placeholder="Akwasi Menu"
          name="name"
          onChange={handleChange}
          value={user.name}
        />
        <div>
          <Input
            label="email"
            placeholder="mail@domain.com"
            name="email"
            type="email"
            onChange={handleChange}
            value={user.email}
          />
          <Input label="username" name="username" value={user.username} />
        </div>

        <Input
          onChange={handleChange}
          label="password"
          type="password"
          name="password"
        />
        <Input
          label="confirm password"
          type="password"
          onChange={handleChange}
          name="confirm_password"
        />

        <select name="role" value={user.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="teller">Teller</option>
          <option value="manager">Manager</option>
        </select>
        <button
          type="submit"
          className="bg-primary hover:bg-primary items-center justify-center gap-2 flex mx-auto text-center transition-colors ease-in py-1 px-2 min-w-[100px] rounded"
        >
          Edit <FaPlus />
        </button>
      </form>
    </>
  );
};

export default Edit;
