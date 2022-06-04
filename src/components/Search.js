import React from "react";

const Search = ({ onUpdateSearch, disabled }) => {
  const searchHandler = (e) => {
    onUpdateSearch(e.target.value);
  };

  return (
    <input
      type="search"
      disabled={disabled}
      id="eventSearch"
      placeholder="Search events"
      onChange={searchHandler}
    />
  );
};

export default Search;
