import {
  printer as ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} from "node-thermal-printer";

import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

import { Order as IOrder, OrderItem } from "@/types/order";
import getUserID from "@/utils/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  orders?: IOrder[];
  order?: IOrder;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const electron =
        typeof process !== "undefined" &&
        process.versions &&
        !!process.versions.electron;

      let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON, // Printer type: 'star' or 'epson'
        interface: "printer:auto", // Printer interface
        characterSet: CharacterSet.SLOVENIA, // Printer character set - default: SLOVENIA
        removeSpecialCharacters: false, // Removes special characters - default: false
        lineCharacter: "=", // Set character for lines - default: "-"
        breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
        options: {
          // Additional options
          timeout: 5000, // Connection timeout (ms) [applicable only for network printers] - default: 3000
        },
        driver: require(electron ? "electron-printer" : "printer"),
      });

      console.log(printer);
      console.log(await printer.isPrinterConnected());
      const token = req.headers.authorization?.split(" ")[1] as string;

      const userID = getUserID(token);
      if (!userID) return res.status(401).end("Unauthorized!");
      const { teller, items, customer, status, payment_method, amt_paid } =
        req.body;
      const total = [...items].reduce(
        (accumulator: number, currentValue: OrderItem) =>
          accumulator + currentValue.price,
        0
      );
      console.log("price1", items[0].price);
      const order = await Order.create({
        teller,
        items,
        customer,
        total,
        status,
        payment_method,
        amt_paid,
      });
      order.items.forEach(async ({ item, quantity }: OrderItem) => {
        const product = await Product.findById(item);
        product.quantity = product.quantity - quantity;
        await product.save();
      });

      return res.status(201).json({ message: "Order created", order });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }
  if (req.method === "GET") {
    try {
      const { status } = req.query;
      await dbConnect();

      const orders: IOrder[] = status
        ? await Order.find({ status: status })
        : await Order.find();
      return res.status(200).json({ message: "Products listed", orders });
    } catch (error) {
      console.log(error);
    }
  }
}
