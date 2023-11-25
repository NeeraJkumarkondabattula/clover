import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { Data } from "../assets/Data";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostInput from "../components/PostInput";

const UserPage = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    async function Fetch() {
      await axios
        .get(`/api/users/profile/${username}`)
        .then((res) => setUser(res.data));
    }
    Fetch();
  }, [user]);
  useEffect(() => {
    async function Fetch() {
      await axios
        .get(`/api/posts/user/${user._id}`)
        .then((res) => user && setPosts(res.data));
    }
    Fetch();
  }, [user]);
  // console.log(posts);
  return (
    <>
      {user && (
        <UserHeader
          id={user._id}
          name={user.name}
          username={user.username}
          bio={user.bio}
          followers={user.followers}
          followersCount={user.followers.length}
          followingCount={user.following.length}
          profilePic={user.profilePic}
        />
      )}
      <PostInput />
      {posts &&
        posts.map((post, index) => {
          return (
            <UserPost
              key={index}
              post={post.img}
              postContext={post.text}
              postedBy={post.postedBy}
              id={post._id}
              likes={post.likes}
              comments={post.comments}
              likesCount={post.likes.length}
              commentsCount={post.comments.length}
            />
          );
        })}
    </>
  );
};

export default UserPage;
