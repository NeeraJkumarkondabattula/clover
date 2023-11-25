import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Link to="/clover" style={{ color: "white", textDecoration: "none" }}>
      <Container>
        <img
          src="https://cdn-icons.flaticon.com/svg/10506/10506852.svg?token=exp=1700555382~hmac=06338da97a44498e1b51ce772a333261"
          alt=""
        />
        <span>Clover</span>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  img {
    width: 2rem;
    filter: invert(100);
  }
  span {
    font-size: 1.8rem;
  }
`;

export default Header;
