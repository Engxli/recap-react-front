import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getTweetsByUserId } from "../apis/tweet";
import Tweet from "../components/Tweet";

const UserProfile = () => {
  const { userId } = useParams();

  const { data } = useQuery({
    queryKey: ["user tweets", userId],
    queryFn: () => getTweetsByUserId(userId),
  });

  const tweets = data?.map((result) => {
    return (
      <div className="w-[70%] h-[100px] mb-5 mx-auto">
        <Tweet
          tweet={result.text}
          username={result.user.username}
          isOwner={false}
        />
      </div>
    );
  });
  if (!data) return null;
  return (
    <div className="w-screen h-screen bg-red-500 flex flex-col justify-center items-center">
      <div>{data[0].user.username}</div>
      <div className="border border-black rounded-lg flex flex-col w-[50%] h-[75%] p-5 gap-5  items-center">
        <div className="overflow-scroll w-full h-full  ">{tweets}</div>
      </div>
    </div>
  );
};

export default UserProfile;
