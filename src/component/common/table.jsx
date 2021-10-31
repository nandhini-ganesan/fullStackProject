import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader //contains logic for sorting based on column names
        columns={columns} //pass column names for sorting
        onSort={onSort} //this method is passed from movies component -> here ->tableheader
        sortColumn={sortColumn} //pass initial sort column and order
      />
      <TableBody
        data={data}
        columns={columns} //pass list of movies to be diplayed in the body and column names
      />
    </table>
  );
};

export default Table;
