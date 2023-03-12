import Input from "@/components/core/Input";
import Modal from "@/components/core/Modal";
import LayoutWithSide from "@/components/Layout/LayoutWithSide";
import Add from "@/components/Users/Forms/Add";
import Delete from "@/components/Users/Forms/Delete";
import Edit from "@/components/Users/Forms/Edit";
import { useModalWithData } from "@/hooks/useModal";
import { IUser } from "@/types/user";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { Dialog } from "@headlessui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const { toggle, setSelected } = useModalWithData();

  useEffect(() => {
    (async () => {
      const { users: data } = await makeSecuredRequest("/api/users");

      setUsers(data);
    })();
  }, []);
  return (
    <LayoutWithSide>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-yellow-600">Users</h1>

        <div className="relative px-4">
          <button
            onClick={() => {
              setSelected(<Add />);
              toggle();
            }}
            className="flex items-center gap-2 bg-primary text-white px-2 rounded-full absolute right-3 -top-[3rem] py-2"
          >
            Add <FaPlusCircle />
          </button>
          <table className="w-full text-sm text-left text-gray-500 mt-3">
            <thead className="text-xs text-white uppercase bg-slate-300 rounded font-extrabold">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">email</th>
                <th className="px-6 py-3">role</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={user._id}
                  className={`bg-white  text-gray-900 border hover:bg-slate-200 ${
                    index % 2 === 0 && "bg-slate-100"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border ">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border">
                    {user.username || "unset"}
                  </td>
                  <td className="px-6 py-4 border">{user.email || "unset"}</td>
                  <td className="px-6 py-4 border">{user.role || "unset"}</td>
                  <td className="flex gap-2 justify-center  items-center py-4">
                    <FaEdit
                      onClick={() => {
                        setSelected(<Edit data={user} />);
                        toggle();
                      }}
                    />
                    <FaTrash
                      onClick={() => {
                        setSelected(<Delete data={user} />);
                        toggle();
                      }}
                    />
                  </td>

                  {/* <td className="px-6 py-4">{item.level}</td>
                <td className="px-6 py-4">{item.campus}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutWithSide>
  );
};

export default Users;
