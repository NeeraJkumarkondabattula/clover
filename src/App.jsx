import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SignOut from "./components/SignOut";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUserData"));
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route
          path="/"
          element={currentUser ? <HomePage /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/update/:id"
          element={
            currentUser ? <ProfileUpdatePage /> : <Navigate to="/auth/signin" />
          }
        />
        <Route path="/auth/signin" element={<AuthPage type={"sign-in"} />} />
        <Route path="/auth/signup" element={<AuthPage type={"sign-up"} />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 620px;
  background-color: #222831;
  /* border: 2px solid white; */
`;

export default App;
