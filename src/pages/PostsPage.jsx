import React from "react";
import Header from "../components/Header";
import { Data } from "../assets/Data";
import UserPost from "../components/UserPost";
import PostInput from "../components/PostInput";

const PostsPage = () => {
  return (
    <>
      <PostInput />
      {Data.map((post, index) => {
        return (
          <UserPost
            key={index}
            post={post.post}
            postContext={post.postContext}
            id={post.id}
            likes={post.likes}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default PostsPage;
