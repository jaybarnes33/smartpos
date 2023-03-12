import Input from "@/components/core/Input";
import { useModalWithData } from "@/hooks/useModal";
import { handleDelete, handleEdit } from "@/components/Products/controllers";
import { Item, Product } from "@/types/item";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";

const Delete = ({ data }: { data: Product }) => {
  const { toggle } = useModalWithData();
  return (
    <>
      <Dialog.Title className="text-xl font-bold">Delete Product</Dialog.Title>
      <form
        className="px-2"
        onSubmit={async (e) => {
          e.preventDefault();
          toggle();
          await handleDelete(data._id);
        }}
      >
        <p>Are you sure you want to delete {data.name}?</p>
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
