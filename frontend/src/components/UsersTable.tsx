import { useState } from "react";
import Pagination from "./Pagination";
import { useGetUserCount, useGetUsers } from "../api";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import TableRow from "./table/TableRow";
import Table from "./table/Table";

const columns = ["Full Name", "Email Address", "Address"];

const UsersTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { data: count = 1 } = useGetUserCount();
  const { isLoading, data: users = [] } = useGetUsers(
    currentPage,
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
      <div className="max-w-4xl mx-auto min-h-[600px] w-full">
        <h1 className="text-2xl sm:text-5xl font-medium text-gray-800 mb-4 text-primary my-4">
          Users
        </h1>
        <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader />
            </div>
          ) : (
            <Table
              columns={columns}
              data={users}
              onRowClick={({ id, name }) => handleNavigation(id, name)}
              renderRow={(user) => (
                <>
                  <TableRow
                    data={[
                      user.name,
                      user.email,
                      `${user.address.street}, ${user.address.city}`,
                    ]}
                  />
                </>
              )}
            />
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
