import React, { useContext, useState } from "react";
import Input from "../components/Input";
import UserContext from "../context/UserContext";

import UserNav from "../components/UserNav";
import Tweet from "../components/Tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTweet, getAllTwqqeets } from "../apis/tweet";
import { me } from "../apis/auth";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [tweet, setTweet] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["tweets"],
    queryFn: () => getAllTwqqeets(),
  });
  const { data: mee } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  const { mutate } = useMutation({
    mutationKey: ["createTweet"],
    mutationFn: () => createTweet(tweet),
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  const tweets = data?.map((result) => {
    return (
      <div className="w-[70%] h-[100px] mb-5 mx-auto">
        <Tweet
          tweetId={result._id}
          tweet={result.text}
          username={result.user.username}
          isOwner={result.user.username == mee?.username}
          onClick={() => {
            if (false) {
              navigate("/profile");
            } else {
              navigate(`/profile/${result.user._id}`);
            }
          }}
        />
      </div>
    );
  });

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-5">
      <div className="w-full">
        <UserNav setShowModal={setShowModal} />
      </div>

      <div className="border border-black rounded-lg flex flex-col w-[50%] h-[75%] p-5 gap-5  items-center">
        <div className="overflow-scroll w-full h-full  ">{tweets}</div>
      </div>

      <Modal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
      >
        <div className="w-full h-full bg-red-500">
          <Input
            label="New tweet?"
            placeholder="Enter your tweet here..."
            name={"text"}
            onChange={(e) => {
              setTweet({ ...tweet, [e.target.name]: e.target.value });
            }}
          />
          <Button lable="Tweet" onClick={mutate} />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
