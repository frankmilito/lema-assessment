import { Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/UserList";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <Routes>
      <Route path="/users" element={<UserList />} />
      <Route path="/users/posts/:id" element={<UserPosts />} />
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  );
}

export default App;
