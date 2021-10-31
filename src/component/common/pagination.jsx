import React, { Component } from "react";
import _ from "lodash"; //filling the array
import PropTypes from "prop-types"; //for type check

class Pagination extends Component {
  render() {
    //values sent from movies component is destructured here
    const { itemsCount, page_size, current_page, onPageChange } = this.props;

    //calculate the number of pages needed
    const number_of_pages = Math.ceil(itemsCount / page_size);

    //if 1 page, no need to display page numbers
    if (number_of_pages === 1) return null;

    //if > 1 pages, then form the page numbers from 1 to required
    const page_number_array = _.range(1, number_of_pages + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {page_number_array.map(
            (
              page //for every page number in the array
            ) => (
              <li
                key={page}
                className={
                  //set the active page if page in array = current selected page
                  page === current_page ? "page-item active" : "page-item"
                }
              >
                <a
                  className="page-link"
                  onClick={
                    () => onPageChange(page)
                    //onClick of any page number, call this function in movies component to
                    //set the current page
                  }
                >
                  {page}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    );
  }
}

//this is for type check of this.props
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  page_size: PropTypes.number.isRequired,
  current_page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
