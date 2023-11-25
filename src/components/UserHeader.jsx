import React, { useState } from "react";
import styled from "styled-components";
import SignOut from "./SignOut";
import loading from "./loading.gif";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserHeader = ({
  id,
  name,
  username,
  bio,
  followers,
  followersCount,
  followingCount,
  profilePic,
}) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUserData"));
  const [isloading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState();
  const [searchUser, setSearchUser] = useState();
  const [follow, setFollow] = useState(false);
  const handleFollow = async () => {
    setIsLoading(true);
    await axios.post(`/api/users/follow/${id}`).then((res) => {
      setSearchUser(res.data);
      setFollow(!follow);
    });
    setIsLoading(false);
    // .then(() => window.location.reload());
  };
  const handleUrlShare = () => {
    setCurrentUrl(location.href);
    console.log(currentUrl);
  };
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/update/${currentUser._id}`);
  };
  // console.log(currentUser);
  return (
    <Container>
      <div className="user-data">
        <div className="user-context">
          <h1>{name}</h1>
          <p className="username at">
            <img
              src="https://cdn-icons.flaticon.com/svg/5070/5070390.svg?token=exp=1700558435~hmac=d8c1fa49189a5aed738aef7a63a6d259"
              alt=""
            />
            {username}
            <span className="threadsNet">threads.net</span>
          </p>
          <p className="bio">
            {bio} &nbsp;
            {/* <span className="at">
              <img
                src="https://cdn-icons.flaticon.com/svg/5070/5070390.svg?token=exp=1700558435~hmac=d8c1fa49189a5aed738aef7a63a6d259"
                alt=""
              />
              {username}
            </span> */}
          </p>
          <div className="user-share">
            <p className="user-followers">
              {followersCount} Followers • {followingCount} Following
            </p>
            <img
              src="https://cdn-icons.flaticon.com/svg/3917/3917574.svg?token=exp=1700559563~hmac=54de0deb72b942de7b78d2f3bb23d657"
              alt=""
              onClick={handleUrlShare}
            />
          </div>
        </div>
        <div className="user-profile">
          <img
            src={
              profilePic
                ? profilePic
                : "https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
            }
            alt=""
          />
          {currentUser.username !== username ? (
            isloading ? (
              <img src={loading} alt="img" className="loading" />
            ) : (
              <div className="follow" onClick={handleFollow}>
                {followers.includes(currentUser._id) ? "Following" : "Follow"}
              </div>
            )
          ) : (
            ""
          )}
          {currentUser.username === username ? (
            <>
              <div className="edit" onClick={handleUpdate}>
                edit
              </div>
              <SignOut />
            </>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  /* border: 1px solid white; */
  .user-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    .user-context {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      h1 {
        font-weight: 600;
      }
      p {
        font-size: 20px;
      }
      .username,
      .bio {
        text-transform: lowercase;
      }
      .bio::first-letter {
        text-transform: capitalize;
      }

      .threadsNet {
        font-size: 14px;
        margin-left: 5px;
        border-radius: 25px;
        padding: 4px 10px;
        background-color: #5c5470;
        color: #e7eaf6;
      }
      .at {
        font-weight: 500;
        font-size: 1.2rem;
        img {
          width: 14px;
          filter: invert(100);
        }
      }
      .user-share {
        display: flex;
        align-items: center;
        gap: 10px;
        /* justify-content: space-between; */
        /* border: 1px solid white; */
        img {
          width: 20px;
          filter: invert(100);
        }
        .user-followers {
          color: #5c5470;
        }
      }
    }
    .user-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      img {
        width: 6rem;
        border-radius: 50%;
      }
      .follow,
      .edit {
        width: 90%;
        padding: 4px 0;
        font-weight: 600;
        font-size: 0.8rem;
        text-transform: capitalize;
        text-align: center;
        border: 1px solid white;
      }
      .loading {
        padding: 0;
        width: 30px;
        /* border: 1px solid white; */
      }
    }
  }
`;

export default UserHeader;
