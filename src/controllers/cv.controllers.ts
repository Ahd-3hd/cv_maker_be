import { Response, Request } from "express";
import fs from "fs";
import path from "path";
import pdf from "pdf-creator-node";
import { v4 as uuidv4 } from "uuid";

export const submit = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const html = fs.readFileSync(
      path.join(process.cwd(), "src/templates", "/templateOne.html"),
      "utf8"
    );
    const outputFileName = `${uuidv4()}.pdf`;

    const options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      header: {},
      footer: {},
    };

    const info = [data];
    const document = {
      html: html,
      data: {
        info: info,
      },
      path: `./pdfs/${outputFileName}`,
      type: "",
    };

    await pdf.create(document, options);

    res.status(201).json({
      message: "CV created successfully",
      data: {
        pdf: `${outputFileName}`,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
