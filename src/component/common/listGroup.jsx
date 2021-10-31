import React from "react";

//to form a list group, here a list of genres
const ListGroup = (props) => {
  const {
    items_list,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;
  return (
    <ul className="list-group">
      {items_list.map(
        (
          item //for each genre/item, set the key to genre._id and display the genre.name
        ) => (
          <li
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        )
      )}
    </ul>
  );
};

//set the default properties to be genre.name and genre._id
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
