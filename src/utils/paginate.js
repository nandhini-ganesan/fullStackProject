import _ from "lodash";

//this function is called from movies component. It gives the list of movies to be diplayed in the
//current page. For this, we need all movies, current page and number of movies per page
export function paginate(items, pagenumber, pagesize) {
  const startIndex = (pagenumber - 1) * pagesize;
  return _(items).slice(startIndex).take(pagesize).value();
}
