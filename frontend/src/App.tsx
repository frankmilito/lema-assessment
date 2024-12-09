import { Routes, Route } from "react-router-dom";
import Page from "./pages/UserList";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/posts" element={<UserPosts />} />
    </Routes>
  );
}

export default App;
