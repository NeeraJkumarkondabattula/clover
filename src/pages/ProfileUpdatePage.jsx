import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import loading from "../components/loading.gif";
import "react-toastify/dist/ReactToastify.css";

const ProfileUpdatePage = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [bio, setBio] = useState();
  const [profilePic, setProfilePic] = useState();
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();

  const { id } = useParams();
  let user = JSON.parse(localStorage.getItem("currentUserData"));
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file type");
      setProfilePic("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios
        .put(`/api/users/update/${id}`, {
          name,
          bio,
          password,
          email,
          username,
          profilePic,
        })
        .then((res) => {
          localStorage.setItem("currentUserData", JSON.stringify(res.data));
          user = JSON.parse(localStorage.getItem("currentUserData"));
          toast.success("Profile Update success");
        })
        .then(() =>
          setTimeout(() => {
            setIsLoading(false);
            navigate(`/${user.username}`);
          }, 2000)
        );
      setName("");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data);
    }
  };
  return (
    <Conatiner>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>
        <h1>Update Your Profile</h1>
        <form>
          <div>
            <img
              src={profilePic ? profilePic : user.profilePic}
              alt=""
              // className="user-profile-preview"
            />
          </div>
          <input type="file" onChange={handleProfileImage} />
          <input
            type="text"
            placeholder="Enter you name.."
            name="name"
            defaultValue={user.name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter you username.."
            name="username"
            defaultValue={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter you email.."
            name="email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter you Bio.."
            name="bio"
            defaultValue={user.bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter you password.."
            name="password"
            defaultValue={user.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isLoading ? (
            <img src={loading} alt="img" className="loading" />
          ) : (
            <button onClick={handleSubmit}>Update</button>
          )}
        </form>
      </div>
    </Conatiner>
  );
};

const Conatiner = styled.div`
  height: 100vh;
  text-align: center;
  background-color: white;
  padding: 20px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    padding: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        aspect-ratio: 1/1;
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    input {
      width: 100%;
      height: 40px;
      padding: 0 10px;
    }
    .loading {
      filter: invert(100);
    }
    button {
      width: 50%;
      height: 4vh;
      font-weight: 600;
      background-color: black;
      color: white;
      border: none;
    }
  }
`;

export default ProfileUpdatePage;
