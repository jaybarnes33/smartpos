import Input from "@/components/core/Input";
import { useModalWithData } from "@/hooks/useModal";
import { handleAdd } from "@/components/Users/controllers";

import { Dialog } from "@headlessui/react";
import React, { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { User } from "@/types/user";
import { toast } from "react-toastify";

const Add = () => {
  const [user, setUser] = useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    confirm_password: "",
  });

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
            ? handleAdd(user)
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
          <Input
            label="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <Input
          label="password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Input
          label="confirm password"
          type="password"
          onChange={handleChange}
          value={user.confirm_password}
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
          Add <FaPlus />
        </button>
      </form>
    </>
  );
};

export default Add;
