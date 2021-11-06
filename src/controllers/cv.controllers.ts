import { Response, Request } from "express";

export const submit = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    res.status(200).json({
      message: "CV submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
