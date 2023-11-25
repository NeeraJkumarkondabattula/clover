import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/api/users/signup", {
          name,
          password,
          email,
          username,
        })
        .then((res) => {
          localStorage.setItem("currentUserData", JSON.stringify(res.data));
          toast.success("Sign up successfull");
        })
        .then(() =>
          setTimeout(() => {
            navigate("/auth/signin");
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
        <h1>Let's Sign Up</h1>
        <form>
          <input
            type="text"
            placeholder="Enter you name.."
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter you username.."
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter you email.."
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter you password.."
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Sign UP</button>
          <p>
            You have already account ? <Link to="/auth/signin">Sign In</Link>
          </p>
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
      border: none;
    }
  }
`;

export default SignUp;
