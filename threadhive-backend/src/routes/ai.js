import { Router } from "express";
import authHandler from "../middleware/authHandler.js";
import { summarizeThread, rephraseText } from "../controllers/aiController.js";

const router = Router();

router.post("/summarize/:threadId", authHandler, summarizeThread);
router.post("/rephrase", authHandler, rephraseText);

export default router;
