import { Link } from "react-router-dom";
import Card from "../components/Card";
import CreatePost from "../components/CreatePost";
import { useState } from "react";

const UserPosts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const posts = [
    {
      title: "I Got a Letter",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dol...",
    },
    {
      title: "What a Nice Town",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dol...",
    },
    {
      title: "I Love My Wife, Mary",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dol...",
    },
    {
      title: "How can Anyone Eat ",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dol...",
    },
  ];

  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <div className="flex min-h-screen justify-center items-center ">
      <div className="max-w-5xl mx-auto p-6 min-h-[600px] ">
        <div className="flex items-center space-x-2 text-gray-500 mb-6">
          <Link to="/" className="text-sm hover:underline">
            &larr; Back to Users
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">James Sunderland</h1>
          <p className="text-gray-500">
            james.sunderland@acme.corp &bull; {posts.length} Posts
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          onClick={handleToggle}
        >
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 cursor-pointer">
            <span className="text-sm font-semibold">+ New Post</span>
          </div>

          {posts.map((post, index) => (
            <Card
              key={index}
              title={post.title}
              content={post.content}
              onDelete={() => console.log(`Delete post ${index}`)}
            />
          ))}
        </div>
      </div>
      <CreatePost isOpen={isOpen} onClose={handleToggle} onSave={() => {}} />
    </div>
  );
};

export default UserPosts;
