import { useState } from "react";
import { TableRowProps } from "../types";
import Pagination from "./Pagination";

const TableRow = ({ name, email, address }: TableRowProps) => (
  <tr className="border-b border-gray-200 last:border-0 text-sm">
    <td className="py-4 px-6 text-gray-600 font-medium">{name}</td>
    <td className="py-4 px-6 text-gray-400">{email}</td>
    <td className="py-4 px-6 text-gray-400 truncate">{address}</td>
  </tr>
);

const users = [
  {
    name: "mes Sunderland",
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

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentItems = users.slice(
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
              {currentItems.map((user, index) => (
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
