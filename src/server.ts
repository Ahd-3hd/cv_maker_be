import express from "express";
import cors from "cors";
import db from "./db";
import userRouter from "./routes/auth.route";
import cvRouter from "./routes/cv.route";
import path from "path";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

console.log(__dirname);

app.use("/pdfs", express.static(path.join(__dirname, "../pdfs")));

app.use("/api/v1", userRouter);
app.use("/api/v1", cvRouter);

app.listen(PORT, async () => {
  await db();
  console.info(`Server running at port ${PORT}`);
});
