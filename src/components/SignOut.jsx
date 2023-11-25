import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignOut = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        localStorage.removeItem("currentUserData");
        navigate("/auth/signin");
      }}>
      Sign Out
    </Button>
  );
};

const Button = styled.div`
  width: 90%;
  padding: 4px 0;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: capitalize;
  text-align: center;
  border: 1px solid white;
`;

export default SignOut;
