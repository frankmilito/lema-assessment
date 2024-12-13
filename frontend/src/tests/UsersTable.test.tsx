import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import { useGetUserCount, useGetUsers } from "../api";

jest.mock("../api", () => ({
  useGetUserCount: jest.fn(),
  useGetUsers: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockUserCount = 10;
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    address: {
      street: "123 Main St",
      state: "CA",
      city: "Los Angeles",
      zipcode: "90001",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    address: {
      street: "456 Elm St",
      state: "NY",
      city: "New York",
      zipcode: "10001",
    },
  },
];

describe("UsersTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useGetUserCount as jest.Mock).mockReturnValue({ data: mockUserCount });
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
    });

    render(
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders empty state when no users are found", () => {
    (useGetUserCount as jest.Mock).mockReturnValue({ data: mockUserCount });
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>
    );

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  test("renders users table with data", () => {
    (useGetUserCount as jest.Mock).mockReturnValue({ data: mockUserCount });
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    });

    render(
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
    expect(
      screen.getByText("123 Main St, CA, Los Angeles, 90001")
    ).toBeInTheDocument();
  });
});
