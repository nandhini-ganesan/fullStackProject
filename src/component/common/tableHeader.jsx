import React, { Component } from "react";

//responsible for sorting based on selected column names
class TableHeader extends React.Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      //if current sort column is same as the this column.path,
      //which means that previously we clicked column1 and again we are clicking column1
      //So we need to change/toggle the order
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      //if we select a different column than the previoues sortcolumn, we sort in ascending
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn); //onclick of any column, set that columnpath and order in props
    //this will be sent moviestable and used when re-rendering
  };
  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path != sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    else return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(
            (
              column //for every column name
            ) => (
              <th
                className="clickable"
                key={column.path || column.key} //set keys as the path for 1-4 & key for 5-6
                onClick={
                  //onclick of any column name call this function and pass the column name
                  () => this.raiseSort(column.path)
                }
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            )
          )}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
