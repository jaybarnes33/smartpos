import { items } from "@/data/items";
import { useBill } from "@/hooks/useBill";
import { useDash } from "@/hooks/useDash";
import { Item, Product } from "@/types/item";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { toast } from "react-toastify";
import Input from "../core/Input";
import Loader from "../core/Loader";
import { search } from "../Products/controllers";
import Listing from "../Search/Listing";
const Bill = () => {
  const { newBill } = useDash();
  const [time, setTime] = useState("");

  useEffect(() => {
    {
      setInterval(() => {
        setTime(new Date().toISOString());
      }, 1000);
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    (async () => {
      const { products: data } = await makeSecuredRequest("/api/products");
      setProducts(data);
    })();
  }, []);

  const handleSearch = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      setLoading(true);
      const items = await search(e.target.value);
      setProducts(items);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const { add, items: bill } = useBill();
  return (
    <>
      {newBill && (
        <div className="shadow col-span-8 p-5 bg-neutral-200 rounded-l-3xl h-screen w-full">
          <div className="text-neutral-500 flex items-center gap-1">
            <FaRegClock />
            <span> {time.substring(0, 10)}</span>
            <span> {time.substring(11, 19)}</span>
          </div>
          <div className="mt-2">
            <Input
              type="search"
              placeholder="Search for item"
              onChange={handleSearch}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-200 p-2 rounded-xl">
                {loading && <Loader />}
                <h1 className="font-extrabold">Products matching query</h1>
                {products?.map((item, index) => (
                  <div key={index + 1} onClick={() => add(item)}>
                    <Listing item={item} />
                  </div>
                ))}
              </div>
              <div>
                <h1>Items in Order</h1>
                {bill?.map((item, index) => (
                  <div key={index}>{item.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bill;
