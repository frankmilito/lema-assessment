import { useState } from "react";
import Pagination from "./Pagination";
import { useGetUserCount, useGetUsers } from "../api";
import Loader from "./Loader";
import TableHeader from "./table/TableHeader";
import EmptyState from "./EmptyState";
import { useNavigate } from "react-router-dom";

const columns = ["Full Name", "Email Address", "Address"];

const UsersTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { data: count = 1 } = useGetUserCount();
  const { isLoading, data: users = [] } = useGetUsers(
    currentPage - 1,
    itemsPerPage
  );

  const totalPages = Math.ceil(count / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigation = (id: string, name: string) => {
    navigate(`/users/posts/${id}`, { state: { name } });
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 my-6">
      <div className="max-w-5xl mx-auto min-h-[600px] w-full">
        <h1 className="text-2xl sm:text-5xl font-medium text-gray-800 mb-4 text-primary my-4">
          Users
        </h1>
        <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center ">
              <Loader />
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <TableHeader columns={columns} />
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length}>
                      <EmptyState message="No Users Found" />
                    </td>
                  </tr>
                ) : (
                  users.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 last:border-0 text-sm cursor-pointer hover:bg-gray-50"
                      onClick={() => handleNavigation(item.id, item.name)}
                      data-testid="tableDataRow"
                    >
                      <td className="py-6 px-6 text-gray-600 font-medium truncate whitespace-nowrap overflow-hidden">
                        {item.name}
                      </td>
                      <td className=" text-gray-500 py-4 px-6 truncate whitespace-nowrap overflow-hidden font-extralight">
                        {item.email}
                      </td>
                      <td className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[392px]  text-gray-500 truncate whitespace-nowrap overflow-hidden font-extralight">
                        {`${item.address.street}, ${item.address.state}, ${item.address.city}, ${item.address.zipcode}`}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UsersTable;
