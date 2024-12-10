import { TableHeaderProps } from "../../types";

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <tr className="border-b first:border-0 border-gray-200">
      {columns.map((col, index) => (
        <th
          key={index}
          className="py-4 px-6 text-left text-gray-600 font-semibold text-sm sm:text-base"
        >
          {col}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
