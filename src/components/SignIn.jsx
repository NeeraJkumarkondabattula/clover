import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/api/users/signin", { password, username })
        .then((res) => {
          localStorage.setItem("currentUserData", JSON.stringify(res.data));
          setData(res.data);
          toast.success("Sign In successfull");
        })
        .then(() =>
          setTimeout(() => {
            navigate(`/`);
            setPassword("");
            setUsername("");
            navigate(`/`);
          }, 2000)
        );
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
        <h1>Let's Sign In</h1>
        <form>
          <input
            type="text"
            placeholder="Enter you username.."
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter you password.."
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Sign In</button>
          <p>
            You don't have account ? <Link to="/auth/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </Conatiner>
  );
};
const Conatiner = styled.div`
  height: 92vh;
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
    input {
      width: 100%;
      height: 40px;
      padding: 0 10px;
    }
    button {
      width: 50%;
      height: 4vh;
      font-weight: 600;
      background-color: black;
      color: white;
    }
  }
`;

export default SignIn;
