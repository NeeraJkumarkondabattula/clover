import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import heart from "./heart.png";
import axios from "axios";

const UserPost = ({
  post,
  id,
  postedBy,
  likes,
  comments,
  postContext,
  likesCount,
  commentsCount,
}) => {
  const [user, setUser] = useState();

  const currentUser = JSON.parse(localStorage.getItem("currentUserData"));
  const handleLikes = async () => {
    await axios.post(`/api/posts/like/${id}`).then(() => {});
  };
  useEffect(() => {
    async function Fetch() {
      await axios
        .get(`/api/users/postprofile/${postedBy}`)
        .then((res) => setUser(res.data));
    }
    Fetch();
  }, [user]);

  // console.log(user.profilePic);
  const handlePostClick = () => {
    console.log(id, post, postContext, likes, comments);
  };

  return (
    <Container>
      {user && (
        <>
          <div className="post-header">
            <div className="post-details">
              <div className="post-user-profile">
                <img src={user.profilePic} alt="" />
              </div>
              <div className="post-user-details">
                <Link
                  to={`/${user.username}`}
                  style={{ color: "white", textDecoration: "none" }}>
                  <h1>{user.name}</h1>
                </Link>
                <p>{user.username}</p>
              </div>
            </div>
            <div className="post-options">•••</div>
          </div>
          <div className="post">
            <div className="post-context">{postContext}</div>
            <Link
              to={`/${user.username}/post/${id}`}
              style={{ color: "white", textDecoration: "none" }}>
              {post == "" ? null : (
                <div className="post-img">
                  <img src={post} alt="" onClick={handlePostClick} />
                </div>
              )}
            </Link>
          </div>
          <div className="post-lsc">
            <img
              src={
                likes.includes(currentUser._id)
                  ? heart
                  : "https://cdn-icons.flaticon.com/svg/3916/3916580.svg?token=exp=1700565545~hmac=328a5f708c89677dfd7f91b5517d453e"
              }
              style={
                likes.includes(currentUser._id) ? { filter: "invert(0)" } : null
              }
              alt="heart"
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
            <p className="post-likes">{likesCount} Likes</p>
            <p className="post-comments">{commentsCount} Comments</p>
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
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
        border-radius: 50%;
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
export default UserPost;
