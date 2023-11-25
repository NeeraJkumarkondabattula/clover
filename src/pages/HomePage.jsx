import React, { useEffect, useState } from "react";
import PostInput from "../components/PostInput";
import { Data } from "../assets/Data";
import UserPost from "../components/UserPost";
import loading from "../components/loading.gif";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("currentUserData"));
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function Fetch() {
      setIsLoading(true);
      await axios.get("/api/posts/feed").then((res) => {
        setPosts(res.data.feedPosts);
      });
    }
    Fetch();
    setIsLoading(false);
  }, [user]);
  // console.log(posts);
  return (
    <>
      <Container>
        <div className="post-header">
          <div className="post-details">
            <div className="post-user-profile">
              <img src={user.profilePic} alt="" />
            </div>
            <div className="post-user-details">
              <Link
                to={`/${user.username}`}
                style={{ color: "white", textDecoration: "none" }}>
                <h1>{user.username}</h1>
                <p>{user.bio}</p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <PostInput />
      {isLoading ? (
        <img src={loading} alt="img" className="loading" />
      ) : (
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
        })
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  /* border: 1px solid white; */
  background-color: #222831;
  padding: 0 1.5rem;
  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .post-details {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      .post-user-profile img {
        width: 4rem;
      }
      .post-user-details {
        width: 400px;
        overflow-x: hidden;
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
    }
    .post-options {
      font-size: 10px;
    }
  }
`;

export default HomePage;
