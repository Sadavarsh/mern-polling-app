import axios from 'axios';

const API_URL = 'http://localhost:8000/api/polls';

export const fetchPolls = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createPoll = async (poll) => {
  const { data } = await axios.post(`${API_URL}/create`, poll);
  return data;
};

export const votePoll = async (pollId, optionIndex) => {
  const { data } = await axios.post(`${API_URL}/vote`, { pollId, optionIndex });
  return data;
};
