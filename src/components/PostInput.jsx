import React, { useState } from "react";
import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import loading from "./loading.gif";

const PostInput = () => {
  const [postImg, setPostImg] = useState();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUserData"));
  const imgRef = useRef(null);
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file type");
      setPostImg("");
    }
  };
  const handlePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post("/api/posts/create", { postedBy: user._id, postImg, text })
      .then(() => {
        setText("");
        setPostImg("");
      });
    setIsLoading(false);
  };
  return (
    <Container>
      <form onSubmit={handlePost}>
        <h1>Create Post</h1>
        {isLoading ? (
          <img src={loading} alt="img" className="loading" />
        ) : (
          <textarea
            className="input-text"
            defaultValue={text}
            onChange={(e) => setText(e.target.value)}></textarea>
        )}
        {!isLoading
          ? postImg && (
              <button
                className="post-preview-close-button"
                onClick={() => setPostImg("")}>
                <img
                  src="https://cdn-icons.flaticon.com/svg/10490/10490350.svg?token=exp=1700816216~hmac=67790297ece662eda457836a3f3e992e"
                  alt=""
                />
              </button>
            )
          : null}
        {!isLoading
          ? postImg && <img src={postImg} alt="" className="post-preview" />
          : null}
        {!isLoading ? (
          <div className="post-type">
            <input
              type="file"
              ref={imgRef}
              onChange={handleProfileImage}
              hidden
            />
            <img
              src="https://www.flaticon.com/svg/vstatic/svg/3917/3917317.svg?token=exp=1700813500~hmac=f0b1a81add096a71d8e117d33007bf31"
              alt=""
              onClick={() => imgRef.current.click()}
              className="post-img-logo"
            />
            <button>Post</button>
          </div>
        ) : null}
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
  form {
    padding: 10px;
    /* border: 2px solid white; */
  }
  h1 {
    font-size: 25px;
    font-weight: 600;
  }
  .input-text {
    outline: none;
    /* border: 2.8px solid white; */
    padding: 10px;
    color: white;
    width: 100%;
    height: auto;
    background-color: #222731;
  }
  .post-preview-close-button {
    padding: 2px 10px;
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
    img {
      width: 20px;
      filter: invert(100);
    }
  }
  .post-preview {
    width: 100%;
    /* border: 1px solid white; */
  }
  .input-text::-webkit-scrollbar {
    display: none;
  }
  .post-type {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .post-img-logo {
      width: 30px;
      filter: invert(100);
    }
    button {
      width: 5rem;
      padding: 4px 0;
      font-weight: 600;
      font-size: 0.8rem;
      color: white;
      text-transform: capitalize;
      text-align: center;
      background-color: #222831;
      border: 2px solid white;
    }
  }
`;

export default PostInput;
