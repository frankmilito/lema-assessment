import { TableProps } from "../../types";
import EmptyState from "../EmptyState";

const Table = <T extends object>({
  columns,
  data,
  onRowClick,
  renderRow,
}: TableProps<T>) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
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
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>
              {" "}
              <EmptyState message="No Users Found" />
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 last:border-0 text-sm cursor-pointer"
              onClick={() => onRowClick(item)}
            >
              {renderRow(item)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
