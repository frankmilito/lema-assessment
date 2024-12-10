import { useState } from "react";
import { useCreatePost } from "../api";
import Button from "./Button";

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

  const handleSave: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
        <form onSubmit={handleSave}>
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
              rows={4}
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              label="Cancel"
              onClick={onClose}
              className="text-gray-700 border hover:bg-gray-100"
            />

            <Button
              label="Publish"
              type="submit"
              className="text-white bg-[#334155] "
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
