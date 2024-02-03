import { instance } from ".";

const getAllTwqqeets = async () => {
  const res = await instance.get("/api/tweets");
  return res.data;
};

const createTweet = async (tweet) => {
  const res = await instance.post("/api/tweets", tweet);
  return res.data;
};

const getTweetsByUserId = async (userId) => {
  const res = await instance.get(`/api/tweets/${userId}`);
  return res.data;
};

const deleteThisCuteTweet = async (tweetId) => {
  const res = await instance.delete(`/api/tweets/${tweetId}`);
  return res.data;
};

const updateThisCuteTweet = async (tweetId, newTweet) => {
  const res = await instance.put(`/api/tweets/${tweetId}`, newTweet);
  return res.data;
};
export {
  getAllTwqqeets,
  createTweet,
  getTweetsByUserId,
  deleteThisCuteTweet,
  updateThisCuteTweet,
};
