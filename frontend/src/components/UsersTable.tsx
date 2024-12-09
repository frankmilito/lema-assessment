import { TableRowProps } from "../types";

const TableRow = ({ name, email, address }: TableRowProps) => (
  <tr className="border-b border-gray-200 last:border-0">
    <td className="py-4 px-6 text-gray-700 font-medium">{name}</td>
    <td className="py-4 px-6 text-gray-500">{email}</td>
    <td className="py-4 px-6 text-gray-500 truncate">{address}</td>
  </tr>
);

const UsersTable = () => {
  const users = [
    {
      name: "James Sunderland",
      email: "james.sunderland@acme.corp",
      address: "11 Katz St., Pennsylvania, Centralia, M4A2T6",
    },
    {
      name: "Heather Mayson",
      email: "h.mayson@acme.corp",
      address: "24 Lindsey St., British Columbia, Vancouver, N9M2K7",
    },
    {
      name: "Henry Townshend",
      email: "henry_townsend@acme.corp",
      address: "10 Rendell St., Ontario, Toronto, M2K3B8",
    },
    {
      name: "Walter Sullivan",
      email: "walter.s@acme.corp",
      address: "9 Wiltse Road, Alberta, Canmore, N9W4H9",
    },
  ];

  return (
    <div className="flex justify-center items-center  ">
      <div className="max-w-4xl mx-auto min-h-screen ">
        <h1 className="text-5xl font-medium text-gray-800 mb-6">Users</h1>
        <div className="overflow-hidden rounded-lg  border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
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
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  name={user.name}
                  email={user.email}
                  address={user.address}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
