import React, { useState } from "react";
import ImgaePicker from "./ImgaePicker";
import Button from "./Button";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteThisCuteTweet, updateThisCuteTweet } from "../apis/tweet";
import Input from "./Input";

const Tweet = ({
  image = "",
  tweet = "werwepiru",
  username = "sdfsdfuy",
  isOwner = false,
  tweetId,
  onClick = () => {},
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const queryClient = useQueryClient();
  const [newTweet, setNewTweet] = useState({});
  const { mutate } = useMutation({
    mutationKey: ["deleteTweet", tweetId],
    mutationFn: () => deleteThisCuteTweet(tweetId),
    onSuccess: () => {
      setShowDeleteModal(false);
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationKey: ["editTweet", tweetId],
    mutationFn: () => updateThisCuteTweet(tweetId, newTweet),
    onSuccess: () => {
      setShowEditModal(false);
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  return (
    <>
      <div className="w-full h-full border border-black rounded-lg flex overflow-hidden relative">
        <div className="absolute inset-0  z-[1]" onClick={onClick}></div>
        <div className="w-[30%]  flex justify-center items-center overflow-hidden">
          <div className="w-[90%] h-[90%] rounded-full overflow-hidden">
            <ImgaePicker />
          </div>
        </div>
        <div className="w-[70%]  flex flex-col">
          <div className="w-full h-full flex justify-between items-center px-1 relative">
            <div>{username}</div>
            {isOwner && (
              <div className="flex  absolute z-[2] right-0">
                <Button
                  lable="Edit"
                  onClick={() => {
                    setShowEditModal(true);
                    setNewTweet({ text: tweet });
                  }}
                />
                <Button
                  lable="Delete"
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                />
              </div>
            )}
          </div>
          <div className="w-full h-full flex px-1">{tweet}</div>
        </div>
        {/* delete */}
      </div>
      <Modal
        close={() => {
          setShowDeleteModal(false);
        }}
        show={showDeleteModal}
      >
        <div className="w-full h-full bg-red-500 flex flex-col justify-center items-center">
          <div>Are you sure you want to delete this tweet?</div>
          <div>{tweet}</div>
          <div className="flex gap-5">
            <Button lable="Yes" onClick={mutate} />
            <Button
              lable="No"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            />
          </div>
        </div>
      </Modal>
      {/* Edit */}
      <Modal
        close={() => {
          setShowEditModal(false);
        }}
        show={showEditModal}
      >
        <div className="w-full h-full bg-red-500">
          <Input
            label="Your old tweet"
            placeholder={tweet}
            value={newTweet.text}
            onChange={(e) => {
              setNewTweet({ text: e.target.value });
            }}
          />
          <Button lable="Update" onClick={editMutate} />
          <Button
            lable="Cancel"
            onClick={() => {
              setShowEditModal(false);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Tweet;
