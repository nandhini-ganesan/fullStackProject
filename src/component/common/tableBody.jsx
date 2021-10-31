import React, { Component } from "react";
import _ from "lodash";

//this is responsible for rendering the moviesalong with all columns
class TableBody extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    //if the column is 5,6 they will have content propetty
    //then return whatever the content of there columns return in moviestable component
    //i.e., like component and delete button
    else return _.get(item, column.path); //for 1-4 columns get the movie's corresponding 4 columns
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(
          (
            item //for each item, here it is movie get all the 6 columns
          ) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={item._id + (column.path || column.content)}>
                  {
                    this.renderCell(item, column) //call this function to render each column
                  }
                </td>
              ))}
            </tr>
          )
        )}
      </tbody>
    );
  }
}

export default TableBody;
