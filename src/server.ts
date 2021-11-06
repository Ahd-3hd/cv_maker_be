import express from "express";
import cors from "cors";
import db from "./db";
import userRouter from "./routes/auth.route";
import cvRouter from "./routes/cv.route";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", userRouter);
app.use("/api/v1", cvRouter);

app.listen(PORT, async () => {
  await db();
  console.info(`Server running at port ${PORT}`);
});
