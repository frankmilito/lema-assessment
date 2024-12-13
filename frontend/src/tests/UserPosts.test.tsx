import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLocation, useParams } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";
import UserPosts from "../pages/UserPosts";
import { useCreatePost, useDeletePost, useGetUserPosts } from "../api";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));
jest.mock("../api");

const mockPosts = [
  {
    id: "1",
    title: "First Post",
    body: "This is the first post content",
  },
  {
    id: "2",
    title: "Second Post",
    body: "This is the second post content",
  },
];

describe("UserPosts", () => {
  const mockDeletePost = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ id: "user123" });
    (useLocation as jest.Mock).mockReturnValue({
      state: { name: "John Doe" },
    });
    (useGetUserPosts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockPosts,
    } as UseQueryResult<typeof mockPosts>);
    (useDeletePost as jest.Mock).mockReturnValue({
      mutate: mockDeletePost,
    });
    (useCreatePost as jest.Mock).mockReturnValue({
      mutate: mockDeletePost,
    });
  });

  it("renders loading state correctly", () => {
    (useGetUserPosts as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as UseQueryResult<typeof mockPosts>);

    render(<UserPosts />);

    expect(screen.getByRole("loader")).toBeInTheDocument();
  });

  it("renders user posts correctly", async () => {
    (useGetUserPosts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockPosts,
    });
    render(<UserPosts />);

    waitFor(() => {
      expect(screen.findByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText(/2 Posts/)).toBeInTheDocument();

      expect(screen.getByText("First Post")).toBeInTheDocument();
      expect(screen.getByText("Second Post")).toBeInTheDocument();
      expect(
        screen.getByText("This is the first post content")
      ).toBeInTheDocument();
    });
  });

  it("deletes a post when delete button is clicked", async () => {
    render(<UserPosts />);

    const deleteButtons = await screen.findAllByTestId("delete");

    fireEvent.click(deleteButtons[0]);

    expect(mockDeletePost).toHaveBeenCalledWith("1");
  });
});
