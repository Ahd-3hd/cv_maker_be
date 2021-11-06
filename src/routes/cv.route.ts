import { Router } from "express";
import { submit } from "../controllers/cv.controllers";

const router = Router();

router.post("/submit", submit);

export default router;
