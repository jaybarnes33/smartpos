// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import escpos from "escpos";
import escposUSB from "escpos-usb";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  escpos.USB = escposUSB;
  const device = new escpos.USB();

  const printer = new escpos.Printer(device);
  console.log(printer);

  device.open(function (error) {
    printer
      .font("A")
      .align("CT")
      .style("bu")
      .size(1, 1)
      .text("The quick brown fox jumps over the lazy dog")
      .text("敏捷的棕色狐狸跳过懒狗")
      .barcode("1234567", "EAN8")
      .table(["One", "Two", "Three"])
      .tableCustom(
        [
          { text: "Left", align: "LEFT", width: 0.33, style: "B" },
          { text: "Center", align: "CENTER", width: 0.33 },
          { text: "Right", align: "RIGHT", width: 0.33 }
        ],
        { encoding: "cp857", size: [1, 1] } // Optional
      )
      .qrimage("https://github.com/song940/node-escpos", function (err) {
        this.cut();
        this.close();
      });
  });
}
