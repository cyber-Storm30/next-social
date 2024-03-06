"use client";
import EndComponent from "@/components/EndComponent/EndComponent";
import Post from "@/components/Post/Post";
import SearchBar from "@/components/SearchBar/SearchBar";
import { AppDispatch } from "@/redux/store";
import { handleGetPosts } from "@/services/postService";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const Feed = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: any) => state.post.posts);
  useEffect(() => {
    dispatch(handleGetPosts());
  }, []);
  return (
    <div>
      <SearchBar />
      {posts?.map((data: PostInterface, idx: any) => {
        return <Post key={idx} data={data} />;
      })}
      <EndComponent />
    </div>
  );
};

export default Feed;
