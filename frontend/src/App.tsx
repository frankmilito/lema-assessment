import { Routes, Route } from "react-router-dom";
import Page from "./pages/UserList";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/users/posts/:id" element={<UserPosts />} />
    </Routes>
  );
}

export default App;
