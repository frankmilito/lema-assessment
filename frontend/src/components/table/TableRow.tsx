import { TableRowProps } from "../../types";

const TableRow = ({ data }: TableRowProps) => {
  return (
    <>
      {data.map((cell, index) => (
        <td key={index} className="py-4 px-6 text-gray-400">
          {cell}
        </td>
      ))}
    </>
  );
};

export default TableRow;
