import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import { useGetUsers, useGetUserCount } from "../api";
import { User } from "../types";

jest.mock("../api");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    address: {
      street: "123 Main St",
      state: "CA",
      city: "San Francisco",
      zipcode: "94105",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    address: {
      street: "456 Market St",
      state: "CA",
      city: "San Francisco",
      zipcode: "94105",
    },
  },
];

const useGetUsersMock = {
  ...({} as User),
  isError: false,
  isLoading: false,
};
describe("UsersTable", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useGetUserCount as jest.Mock).mockReturnValue({
      data: 10,
    } as UseQueryResult<number>);
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    } as UseQueryResult<typeof mockUsers>);
  });

  it("renders loading state correctly", () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as UseQueryResult<typeof mockUsers>);

    render(<UsersTable />);

    expect(screen.getByRole("loader")).toBeInTheDocument();
  });

  it("renders empty state when no users are found", () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      ...useGetUsersMock,
      isLoading: false,
      data: [],
    });

    render(<UsersTable />);

    expect(screen.getByText("No Users Found")).toBeInTheDocument();
  });

  it("renders users data correctly", async () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      ...useGetUsersMock,
      isLoading: false,
      data: mockUsers,
    });
    render(<UsersTable />);

    await screen.findByRole("table");
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();

      expect(screen.getByText(/full name/i)).toBeInTheDocument();
      expect(screen.getByText(/email address/i)).toBeInTheDocument();

      expect(screen.queryAllByTestId("tableDataRow")).toHaveLength(2);
    });
  });

  it("navigates to user posts when clicking a row", () => {
    render(<UsersTable />);
    fireEvent.click(screen.getByText("John Doe"));

    expect(mockNavigate).toHaveBeenCalledWith(
      "/users/posts/1",
      expect.objectContaining({
        state: { name: "John Doe" },
      })
    );
  });

  it("handles pagination correctly", () => {
    render(<UsersTable />);

    const nextPageButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextPageButton);

    expect(useGetUsers).toHaveBeenCalledWith(1, 4);
  });
});
