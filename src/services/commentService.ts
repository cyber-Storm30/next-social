import { useId } from "react";
import { getData, postData } from "./rootService";

export const getPostComments = async (postId?: string) => {
  try {
    const response = await getData(`/comment/post/${postId}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const handleSubmitComment = async (
  postId?: string,
  userId?: string,
  parentId?: string,
  body?: string
) => {
  try {
    const response = await postData(`/comment`, {
      postId,
      userId,
      parentId,
      body,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const handleLikeComment = async (commentId: string, userId: string) => {
  try {
    const response = await postData("/comment/like", {
      userId,
      commentId,
    });
    return response;
  } catch (err) {
    return err;
  }
};
