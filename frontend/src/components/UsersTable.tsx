import { useState } from "react";
import { TableRowProps } from "../types";
import Pagination from "./Pagination";
import { useGetUsers } from "../api";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const TableRow = ({ name, email, address, id }: TableRowProps) => {
  const navigate = useNavigate();
  const handleNavigation = (id: string) => {
    navigate(`/users/posts/${id}`, { state: { name } });
  };
  return (
    <tr
      className="border-b border-gray-200 last:border-0 text-sm cursor-pointer"
      onClick={() => handleNavigation(id)}
    >
      <td className="py-4 px-6 text-gray-600 font-medium">{name}</td>
      <td className="py-4 px-6 text-gray-400">{email}</td>
      <td className="py-4 px-6 text-gray-400 max-w-[392px] truncate overflow-hidden whitespace-nowrap">
        {address}
      </td>
    </tr>
  );
};

const UsersTable = () => {
  const { isLoading, data: users = [] } = useGetUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(100 / itemsPerPage);
  const currentItems = users?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen justify-center items-center ">
      <div className="max-w-4xl mx-auto min-h-[600px] ">
        <h1 className="text-5xl font-medium text-gray-800 mb-4 text-primary ">
          Users
        </h1>
        <div className="overflow-hidden rounded-lg  border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className=" border-b first:border-0 border-gray-200">
                <th className="py-4 px-6 text-left text-gray-600 font-semibold text-sm">
                  Full Name
                </th>
                <th className="py-4 px-6 text-left text-gray-600 font-semibold text-sm">
                  Email Address
                </th>
                <th className="py-4 px-6 text-left text-gray-600 font-semibold text-sm">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <Loader />}
              {currentItems?.map((user) => {
                const { street, state, city, zipcode } = user.address;
                return (
                  <TableRow
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    address={`${street}, ${state}, ${city}, ${zipcode}`}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default UsersTable;
