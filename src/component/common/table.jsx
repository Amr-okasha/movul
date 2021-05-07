import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const TableD = (props) => {
  const {
    columns,
    sortColumn,
    onSort,
    styles,
    items,
    onHandleLike,
    onHandleDelete,
  } = props;
  return (
    <table className="table ">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        styles={styles}
      />
      <TableBody
        items={items}
        onHandleLike={onHandleLike}
        onHandleDelete={onHandleDelete}
        columns={columns}
      />
    </table>
  );
};

export default TableD;
