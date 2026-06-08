import { fetchThreadById } from "../services/threadService.js";
import { getCommentsByThread } from "../services/commentService.js";
import { createAppError } from "../utils/createAppError.js";
import {
  summarizeThread as geminiSummarize,
  rephraseText as geminiRephrase,
} from "../services/geminiService.js";

export const summarizeThread = async (req, res) => {
  const { threadId } = req.params;
  const [thread, comments] = await Promise.all([
    fetchThreadById(threadId),
    getCommentsByThread(threadId),
  ]);

  if (!thread) throw createAppError("Thread not found", 404);

  const summary = await geminiSummarize(thread, comments);
  res.status(200).json({ success: true, message: "Thread summarized successfully", data: summary });
};

export const rephraseText = async (req, res) => {
  const { text, type } = req.body;
  if (!text || !text.trim()) throw createAppError("text is required", 400);

  const rephrased = await geminiRephrase(text, type ?? "text");
  res.status(200).json({ success: true, message: "Text rephrased successfully", data: rephrased });
};
