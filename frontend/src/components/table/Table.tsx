import { TableProps } from "../../types";
import EmptyState from "../EmptyState";
import TableHeader from "./TableHeader";

const Table = <T extends object>({
  columns,
  data,
  onRowClick,
  renderRow,
}: TableProps<T>) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>
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
