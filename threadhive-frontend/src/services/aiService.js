import axiosInstance from '../api/axiosInstance';
import { AI_API } from '../config/apiConfig.js';
import getAuthHeaders from '../utils/getAuthHeaders.js';

export const summarizeThread = async (threadId) => {
  const res = await axiosInstance.post(AI_API.SUMMARIZE(threadId), null, {
    headers: getAuthHeaders(),
  });
  return res.data.data;
};

export const rephraseText = async (text, type) => {
  const res = await axiosInstance.post(AI_API.REPHRASE, { text, type }, {
    headers: getAuthHeaders(),
  });
  return res.data.data;
};
