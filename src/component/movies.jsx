import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";

//configure page_size, current_page, list of movies, list of genres
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    page_size: 4,
    current_page: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  //this will be called when instance is rendered to DOM. This will take few seconds.
  //So initialize movies and genre to empty array, else error will be thrown as 'not initialised'
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All genres" }, ...data]; //for "All genres" in list group
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
    });
  }

  //onClick of delete button, this method is triggered from tablebody component
  handleDeleteEvent = async (movie) => {
    //filter all the movies, except the movie to be deleted
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(
      (curr_movie) => curr_movie._id !== movie._id
    );
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie is already deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  //onClick of like button, this method is triggered from tablebody component
  handleLike = (movie) => {
    //locate the index of the current movie, and set the like/unlike status is DB
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  //onClick of any page number, this method is triggered from pagination component
  handlePageChange = (page) => {
    //set current page to selected page number
    this.setState({ current_page: page });
  };

  //onClick of any genres list group, this method is triggered from listgroup component
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", current_page: 1 });
  };

  handleSearch = (query) => {
    this.setState({ selectedGenre: "", searchQuery: query, current_page: 1 });
  };

  //onClick of column title, this method is called from tableheader component
  handleSort = (sortColumn) => {
    //current selected column and order to sort is set to state
    this.setState({ sortColumn });
  };

  render() {
    const { length: movies_count } = this.state.movies;
    const { user } = this.props;

    const {
      genres,
      page_size,
      current_page,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    //if the movies count is 0, display below message
    if (movies_count === 0) return <p> There are no movies in database </p>;

    //get the list of movies related to selected genre. If no genre is selected,
    //then return all movies
    let filtered = this.state.movies;
    if (searchQuery)
      filtered = this.state.movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = this.state.movies.filter(
        (m) => m.genre._id === selectedGenre._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //get the list of movies to be displayed in this page, by calling the function "paginate"
    const movies = paginate(sorted, current_page, page_size);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items_list={genres} //pass the list of genres to listgroup component
            onItemSelect={this.handleGenreSelect} //onclick of any listgroup item, call this function
            //from listgroup component->here
            selectedItem={selectedGenre} //pass selectedGenre, which is initially undefined
          />
        </div>
        <div className="col">
          {user && (
            <NavLink className="btn btn-primary" to="/movies/new">
              New Movie
            </NavLink>
          )}
          <p> Showing {filtered.length} movies from database</p>
          <SearchBox value={this.searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies} //pass all movies to moviestable component
            onLike={this.handleLike} //onclick of like button this method is called from
            //like component->moviestable->here
            onDelete={this.handleDeleteEvent} //onclick of delete button, this method is called from
            //moviestable->here
            sortColumn={sortColumn} //pass the initial sort column to moviestable component
            onSort={this.handleSort} //onclick of any column heading, this method is called from
            //tableheader->moviestable->here
          />
          <Pagination
            itemsCount={filtered.length} //pass the number of movies in selected genres to
            //pagination component
            page_size={page_size} //pass the page size to pagination component
            current_page={current_page} //pass the current page to pagination component
            onPageChange={this.handlePageChange} //onclick of any page number this method is called from
            //pagination component
          />
        </div>
      </div>
    );
  }
}

export default Movies;
