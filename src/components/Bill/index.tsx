//@ts-nocheck
import { useBill } from "@/hooks/useBill";
import { useDash } from "@/hooks/useDash";

import useUser from "@/hooks/useUser";

import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from "react-thermal-printer";
import { Product } from "@/types/item";
import { Customer, Order } from "@/types/order";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaRegClock, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import Input from "../core/Input";
import Loader from "../core/Loader";
import { search } from "../Products/controllers";
import Listing from "../Search/Listing";
import { handleAdd } from "./controllers";
import OrderItem from "./Item";
import Script from "next/script";

const Bill = () => {
  const { newBill, toggle } = useDash();
  const [time, setTime] = useState("");
  const { user } = useUser();
  const { add, items: bill, clear } = useBill();

  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    location: "",
  });
  const [orderDetails, setOrderDetails] = useState<{
    status: string;
    payment_method: string;
    amt_paid: number;
  }>({
    status: "",
    payment_method: "",
    amt_paid: 0,
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    {
      setInterval(() => {
        setTime(new Date().toISOString());
      }, 1000);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { products: data } = await makeSecuredRequest("/api/products");
      setProducts(data);
    })();
  }, []);

  const total = bill.reduce((acc, item) => {
    return acc + item.number! * item.selling_price;
  }, 0);
  const addToQueue = (items: Product[], customer: Customer, status: string) => {
    const itemsFromStorage =
      JSON.parse(localStorage.getItem("queue") as string) || [];

    const order = {
      customer,
      items,
      status,
    };
    itemsFromStorage.push(order);
    localStorage.setItem("queue", JSON.stringify(itemsFromStorage));
    clear();
    toggle();
  };
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

  const handleOrderDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const connectPrinter = async (order: Order) => {
    console.log({ order });
    const receipt = (
      <Printer type="epson" width={42} characterSet="pc437_usa">
        <Text size={{ width: 2, height: 2 }}></Text>
        <Text bold={true}>Buildrite Hardware</Text>
        {/*@ts-ignore*/}
        <Row left="Teller" right={order.teller.name} />
        <Row left="Customer Name" right={order.customer.name} />
        <Row
          left="Customer Location"
          right={order.customer.location as string}
        />
        <Row left="Customer Address" right={order.customer.phone as string} />
        <Br />
        <Line />
        <Text bold={true}>Order Summary</Text>
        {order.items.map((item, id) => (
          // eslint-disable-next-line react/jsx-key
          <Row
            //@ts-ignore
            left={item.item.name + "   " + item.quantity + "   " + item.price}
            right={
              <Text>
                GHS&nbsp;{(item.price * item.quantity).toFixed(2).toString()}
              </Text>
            }
          />
        ))}
        <Line />
        <Text bold>Order details</Text>
        <Row
          left={<Text bold>Payment Method:</Text>}
          right={<Text>{order.payment_method}</Text>}
        />
        <Row
          left={<Text bold>Order date:</Text>}
          right={<Text>{new Date(order.createdAt).toDateString()}</Text>}
        />
        <Row
          left={<Text bold>Time:</Text>}
          right={
            <Text>{new Date(order.createdAt).toTimeString().slice(0, 5)}</Text>
          }
        />
        <Row
          left={<Text bold>Status:</Text>}
          right={<Text>{order.status}</Text>}
        />

        <Row
          left={<Text bold>Paid:</Text>}
          right={<Text> GHS&nbsp;{order.amt_paid}</Text>}
        />
        <Row
          left={<Text bold>Total:</Text>}
          right={<Text> GHS&nbsp;{total}</Text>}
        />
        <Row
          left={<Text>Balance:</Text>}
          right={
            <Text>
              GHS&nbsp;
              {Math.abs(total - order.amt_paid)
                .toFixed(2)
                .toString()}
            </Text>
          }
        />
        <Text align="center" bold>
          https://otwumasi.tech
        </Text>
        <Cut />
      </Printer>
    );
    let device: USBDevice;
    const devices = await navigator.usb.getDevices();
    if (!devices.length) {
      // Request permission to access the printer
      navigator.usb
        .requestDevice({
          filters: [{ vendorId: 0x04b8, productId: 0x0e28 }],
        })
        .then(async (device) => {
          device = device;
        })
        .catch((error) => console.error(error));
    } else {
      device = devices.find(
        (d) => d.vendorId === 0x04b8 && d.productId === 0x0e28
      )!;
      if (!device) {
        throw new Error("Printer not found.");
      }
    }

    await device.open();
    await device.selectConfiguration(1);

    await device.claimInterface(0);
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    await device.selectAlternateInterface(0, 0); // Select alternate interface
    await device.transferOut(1, await render(receipt));

    await device.releaseInterface(0);
    return await device.close();
  };

  return (
    <>
      {newBill && (
        <div className="shadow col-span-9 p-5 bg-neutral-200 dark:bg-neutral-800 rounded-l-3xl h-screen w-full">
          <div className="text-neutral-500 flex items-center gap-1">
            <FaRegClock />
            <span> {time.substring(0, 10)}</span>
            <span> {time.substring(11, 19)}</span>
          </div>
          <div className="mt-2">
            <div className="grid grid-cols-12 gap-3">
              <div className="bg-neutral-200 dark:bg-neutral-700 col-span-5 p-2 rounded-xl h-[80vh] overflow-scroll">
                {loading && <Loader />}
                <Input
                  type="search"
                  placeholder="Search for item"
                  onChange={handleSearch}
                />
                <h1 className="font-bold dark:text-neutral-100">
                  Products matching query
                </h1>
                {products?.map((item, index) => (
                  <div
                    key={index + 1}
                    onClick={() => add({ ...item, number: 1 } as Product)}
                  >
                    <Listing item={item} />
                  </div>
                ))}
              </div>
              <form
                className="bg-white dark:bg-neutral-700 relative col-span-7 p-4 rounded-2xl "
                onSubmit={async (e) => {
                  e.preventDefault();

                  const order = await handleAdd({
                    customer,
                    items: bill.map((item) => {
                      return {
                        item: item._id,
                        price: item.selling_price,
                        quantity: item.number as number,
                      };
                    }),
                    teller: user?._id,
                    status: orderDetails.status,
                    payment_method: orderDetails.payment_method,
                    amt_paid: orderDetails.amt_paid,
                  });
                  connectPrinter(order);
                  setCustomer({ name: "", location: "", phone: "" });
                  setOrderDetails((prev) => ({
                    status: "",
                    amt_paid: 0,
                    payment_method: "",
                  }));
                  clear();
                  toggle();
                }}
              >
                <div>
                  <h1 className="text-2xl text-center">Customer Details</h1>
                  <div className="grid gap-x-2 grid-cols-2">
                    <Input
                      label="Name"
                      placeholder="John Doe"
                      name="name"
                      required
                      onChange={handleChange}
                    />
                    <Input
                      label="Phone"
                      required
                      name="phone"
                      type="phone"
                      onChange={handleChange}
                      placeholder="0542121331"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <Input
                      label="Location"
                      name="location"
                      onChange={handleChange}
                      placeholder="Tamso Estate, Opposite"
                    />
                    <div className="flex flex-col">
                      <label
                        htmlFor="status"
                        className="text-sm text-neutral-500"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        required
                        onChange={({ target: { value } }) =>
                          setOrderDetails((prev) => ({
                            ...prev,
                            status: value,
                          }))
                        }
                        name="status"
                        className="bg-neutral-100 dark:text-neutral-400 p-2 rounded-sm"
                      >
                        <option value="">Set status</option>
                        <option value="pending">Collected later</option>
                        <option value="processed">Collected Now</option>
                      </select>
                    </div>
                  </div>
                </div>
                <h1 className="text-center text-2xl">Items in Order</h1>

                <div className="h-[34vh] py-2 overflow-scroll">
                  {bill?.map((item) => (
                    <OrderItem item={item} key={item._id} />
                  ))}
                </div>
                <div className="grid grid-cols-2 items-center gap-3  ">
                  <Input
                    onChange={handleOrderDetails}
                    label="Amount Paid"
                    required
                    name="amt_paid"
                    placeholder="3455.00"
                  />
                  <div className="flex flex-col">
                    <label htmlFor="payment_method">Payment Method</label>
                    <select
                      required
                      onChange={handleOrderDetails}
                      name="payment_method"
                      className="bg-slate-100 p-2"
                      id="payment_method"
                    >
                      <option value="">Select a payment method</option>
                      <option value="cash">Cash</option>
                      <option value="momo">Mobile Money</option>
                      <option value="bank">Bank payment</option>
                    </select>
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <span> No. Items : {bill.length}</span>
                  <span>Total: {total}</span>
                  {orderDetails.amt_paid && (
                    <span className="font-bold">
                      Change: {orderDetails.amt_paid - total}
                    </span>
                  )}
                </div>

                {bill.length && (
                  <button
                    type="submit"
                    className="px-3 py-2 flex mx-auto bg-primary rounded-xl hover:bg-primary"
                  >
                    Print
                  </button>
                )}

                <FaSave
                  className="absolute right-2 top-2 hover:scale-105 cursor-pointer"
                  onClick={() =>
                    addToQueue(bill, customer, orderDetails.status)
                  }
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bill;
