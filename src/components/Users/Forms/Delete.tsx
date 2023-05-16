import Input from "@/components/core/Input";
import { useModalWithData } from "@/hooks/useModal";
import { handleDelete } from "@/components/Users/controllers";
import { Item, Product } from "@/types/item";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { IUser } from "@/types/user";
import { useSWRConfig } from "swr";
const Delete = ({ data }: { data: IUser }) => {
  const { toggle } = useModalWithData();
  const { mutate } = useSWRConfig();
  return (
    <>
      <Dialog.Title className="text-xl font-bold">Delete Product</Dialog.Title>
      <form
        className="px-2"
        onSubmit={async (e) => {
          e.preventDefault();
          toggle();
          await handleDelete(data._id);
          mutate("/api/users");
        }}
      >
        <p className="py-2">
          Are you sure you want to delete user with name: {data.name}?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            className="border border-primary hover:bg-primary items-center justify-center gap-2 flex mx-auto text-center transition-colors ease-in py-1 px-2 min-w-[100px] rounded"
            onClick={toggle}
          >
            Cancel
          </button>
          <button
            className="bg-primary hover:bg-primary items-center justify-center gap-2 flex mx-auto text-center transition-colors ease-in py-1 px-2 min-w-[100px] rounded"
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
};

export default Delete;
