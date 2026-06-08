import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL = "gemini-2.5-flash-lite";

let model = null;

function getModel() {
  if (!model) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: MODEL });
  }
  return model;
}

export async function summarizeThread(thread, comments) {
  const commentLines = comments
    .map((c) => `- ${c.user?.name ?? "Anonymous"}: ${c.content}`)
    .join("\n");

  const prompt = `Summarize the following forum thread and its comments in one concise paragraph.

Thread title: ${thread.title}
Thread content: ${thread.content}

Comments:
${commentLines || "(no comments yet)"}

Write a single paragraph summary that captures the main topic and key points from the discussion.`;

  const result = await getModel().generateContent(prompt);
  return result.response.text();
}

export async function rephraseText(text, type) {
  const contextMap = {
    title: "a forum thread title",
    body: "the body of a forum thread post",
    comment: "a forum comment",
  };
  const context = contextMap[type] ?? "text";

  const prompt = `Rephrase the following ${context} to be clearer and more engaging. Return only the rephrased text, nothing else.

Original text: ${text}`;

  const result = await getModel().generateContent(prompt);
  return result.response.text();
}
