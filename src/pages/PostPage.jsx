import React, { useEffect, useState } from "react";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import { Data } from "../assets/Data";
import Comment from "../components/Comment";
import axios from "axios";

const PostPage = () => {
  const { pid } = useParams();
  const [post, setPost] = useState();
  console.log(pid);
  useEffect(() => {
    async function Fetch() {
      await axios.get(`/api/posts/${pid}`).then((res) => setPost(res.data));
    }
    Fetch();
  }, []);
  console.log(post);
  return (
    <div>
      {post && (
        <UserPost
          post={post.img}
          postContext={post.text}
          postedBy={post.postedBy}
          id={post._id}
          likes={post.likes}
          comments={post.comments}
          likesCount={post.likes.length}
          commentsCount={post.comments.length}
        />
      )}
      {/* <Comment
        postContext={data[0].postContext}
        likes={data[0].likes}
        comments={data[0].comments}
        id={data[0].id}
      />
      <Comment
        postContext={data[0].postContext}
        likes={data[0].likes}
        comments={data[0].comments}
        id={data[0].id}
      />
      <Comment
        postContext={data[0].postContext}
        likes={data[0].likes}
        comments={data[0].comments}
        id={data[0].id}
      />
      <Comment
        postContext={data[0].postContext}
        likes={data[0].likes}
        comments={data[0].comments}
        id={data[0].id}
      /> */}
    </div>
  );
};

export default PostPage;
