import React from "react";
import styled from "styled-components";
import heart from "./heart.png";
import { useState } from "react";

const Comment = ({ id, postContext, likes, comments }) => {
  const [like, setLike] = useState(false);
  const handleLikes = () => {
    setLike(!like);
  };

  return (
    <>
      <Container>
        <div className="post-header">
          <div className="post-details">
            <div className="post-user-profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
                alt=""
              />
            </div>
            <div className="post-user-details">
              <h1>neerajkumarkondabattula</h1>
              <p>21-11-2022</p>
            </div>
          </div>
          <div className="post-options">•••</div>
        </div>
        <div className="post">
          <div className="post-context">{postContext}</div>
        </div>
        <div className="post-lsc">
          <img
            src={
              like
                ? heart
                : "https://cdn-icons.flaticon.com/svg/3916/3916580.svg?token=exp=1700565545~hmac=328a5f708c89677dfd7f91b5517d453e"
            }
            alt="heart"
            style={
              like
                ? { filter: "invert(0)", backgroundColor: "#222831" }
                : { filter: "invert(100)" }
            }
            onClick={handleLikes}
          />
          <img
            src="https://cdn-icons.flaticon.com/svg/8034/8034659.svg?token=exp=1700565419~hmac=08fc129c9fc3d54455ea96b76edf4d90"
            alt=""
          />
          <img
            src="https://cdn-icons.flaticon.com/svg/3917/3917436.svg?token=exp=1700565382~hmac=fbe8e9d52564684a0ba89a6d62eca4db"
            alt=""
          />
        </div>
        <div className="post-like-share-comment">
          <p className="post-likes">{likes}K Likes</p>
          <p className="post-comments">{comments}K Comments</p>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  border-top: 1px solid gray;
  /* border: 1px solid white; */
  background-color: #222831;
  padding: 1.5rem;
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
        width: 3rem;
      }
      .post-user-details {
        width: 400px;
        overflow-x: hidden;
        h1 {
          font-size: 14px;
        }
        p {
          font-size: 10px;
          color: #5c5470;
        }
      }
    }
    .post-options {
      font-size: 10px;
    }
  }
  .post {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .post-context {
      padding: 0 0.5rem;
    }
    .post-img {
      img {
        width: 100%;
        border-radius: 0.4rem;
      }
    }
  }
  .post-lsc {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;
    padding: 0.5rem;
    img {
      width: 20px;
      filter: invert(100);
    }
  }

  .post-like-share-comment {
    display: flex;
    padding: 0 0.5rem;
    gap: 10px;
    p {
      font-size: 10px;
      color: #5c5470;
    }
  }
`;

export default Comment;
