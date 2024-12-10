import { useState } from "react";
import { useCreatePost } from "../api";

type CreatePostProp = {
  id: string;
  isOpen: boolean;
  onClose: VoidFunction;
};
const CreatePost = ({ isOpen, onClose, id }: CreatePostProp) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate: createPost } = useCreatePost();

  if (!isOpen) return null;

  const handleSave = () => {
    createPost({
      user_id: id,
      title,
      body: content,
    });
    setTitle("");
    setContent("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl  mb-4">New Post</h2>
        <div className="mb-4">
          <label className="block text-sm  text-gray-700 mb-1">
            Post title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-sm  focus:outline focus:outline-0 placeholder:text-sm"
            placeholder="Give your post a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm  text-gray-700 mb-1">
            Post content
          </label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-sm  focus:outline focus:outline-0 placeholder:text-sm"
            placeholder="Write something mind-blowing"
            rows="4"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={handleSave}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
