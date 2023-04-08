import Input from "@/components/core/Input";
import { useModalWithData } from "@/hooks/useModal";
import { handleAdd } from "@/components/Products/controllers";
import { Item } from "@/types/item";
import { Dialog } from "@headlessui/react";
import React, { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";

const Add = () => {
  const [product, setProduct] = useState<Item>({
    name: "",
    quantity: 0,
    selling_price: 0,
    cost_price: 0,
    description: "",
    location: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  const { toggle } = useModalWithData();
  return (
    <>
      <Dialog.Title className="text-xl font-bold">Add Product</Dialog.Title>
      <form
        className="px-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleAdd(product);
          toggle();
        }}
      >
        <Input
          label="name"
          placeholder="Iron Rods"
          name="name"
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <Input
            label="quantity"
            type="number"
            onChange={handleChange}
            placeholder="0"
            name="quantity"
          />
          <Input
            label="cost price"
            type="number"
            onChange={handleChange}
            placeholder="0"
            name="cost_price"
          />
          <Input
            onChange={handleChange}
            label="selling price"
            type="number"
            placeholder="0"
            name="selling_price"
          />
        </div>

        <Input
          onChange={handleChange}
          label="description"
          name="description"
          placeholder="Enter Product description"
          textarea
        />
        <Input
          onChange={handleChange}
          label="location"
          name="location"
          placeholder="Enter Product location"
          textarea
        />
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
