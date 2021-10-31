import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./../services/authService";

//define the columns needed to be diplayed. First 4 columns are properties of movie object
//like and delete are additional columns to be displayed and have functionality onclick
class MoviesTable extends React.Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          like_value={movie.like} //pass likevalue to like component
          //onclick of like icon in like component calls triggeres like component->here->movies
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  constructor() {
    super();
    const currUser = getCurrentUser();
    if (currUser && currUser.isAdmin) {
      this.columns.push({
        key: "delete",
        content: (movie) => (
          <button //onclick of delete button here triggers here->movies component
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      });
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}
export default MoviesTable;
