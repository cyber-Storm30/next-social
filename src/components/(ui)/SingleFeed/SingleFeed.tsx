"use client";
import CommentInput from "@/components/CommentInput/CommentInput";
import Post from "@/components/Post/Post";
import SearchBar from "@/components/SearchBar/SearchBar";
import { AppDispatch } from "@/redux/store";
import {
  getPostComments,
  handleSubmitComment,
} from "@/services/commentService";
import { handleGetPosts } from "@/services/postService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentSection from "../CommentSection/CommentSection";
import LikeSection from "../LikeSection/LikeSection";

interface PostInterface {
  _id: string;
  body: string;
  comments: Comment[];
  image: string;
  likes: any[];
  title: string;
  userId: UserInterface;
  createdAt: string;
}

interface UserInterface {
  _id: string;
  createdAt: string;
  email: string;
  image: string;
  password: string;
  updatedAt: string;
  username: string;
}

interface CommentInterface {
  _id: string;
  userId: UserInterface;
  postId: string;
  body: string;
  likes: [];
  parentId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SingleFeed = () => {
  const dispatch: AppDispatch = useDispatch();
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const post = useSelector((state: any) => state.post.singlePost);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    dispatch(handleGetPosts());
  }, [dispatch]);

  const submitComment = async (comment: string) => {
    const res = await handleSubmitComment(post._id, user._id, "", comment);
    setComments([res.data, ...comments]);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const commentData = await getPostComments(post?._id);
      setComments(commentData.data);
      setLoading(false);
    };
    getData();
  }, [post?._id]);

  return (
    <div>
      <Post data={post} />
      <CommentInput
        submitComment={submitComment}
        page={page}
        setPage={setPage}
      />
      {page === 0 ? (
        <CommentSection comments={comments} loading={loading} />
      ) : (
        <LikeSection />
      )}
    </div>
  );
};

export default SingleFeed;
