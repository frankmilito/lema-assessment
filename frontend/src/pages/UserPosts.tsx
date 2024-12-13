import { Link, useLocation, useParams } from "react-router-dom";
import Card from "../components/Card";
import CreatePost from "../components/CreatePost";
import { useState } from "react";
import { useDeletePost, useGetUserPosts } from "../api";
import Loader from "../components/Loader";

const UserPosts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { mutate: deletePost } = useDeletePost(id!);
  const { isLoading, data: posts = [] } = useGetUserPosts(id!);

  const location = useLocation();
  const { name } = location.state || {};

  const handleToggle = () => setIsOpen(!isOpen);

  const handleDelete = (postId: string) => {
    deletePost(postId);
  };

  return (
    <div className="flex min-h-screen justify-center items-center ">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto p-6 min-h-[600px] ">
          <div className="flex items-center space-x-2 text-gray-500 mb-6">
            <Link to="/" className="text-sm hover:underline">
              &larr; Back to Users
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800"></h1>
            <p className="text-gray-500">
              {name} &bull; {posts.length} Posts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 cursor-pointer"
              onClick={handleToggle}
            >
              <span className="text-sm font-semibold">+ New Post</span>
            </div>

            {posts.map((post) => (
              <Card
                key={post.id}
                title={post.title}
                content={post.body}
                onDelete={() => handleDelete(post.id)}
              />
            ))}
          </div>
        </div>
      )}
      <CreatePost isOpen={isOpen} onClose={handleToggle} id={id!} />
    </div>
  );
};

export default UserPosts;
