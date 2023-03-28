import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions/index";
import "./searchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(getCountriesByName(value));
  };

  return (
    <div className="searchBar">
      <h3>Search country</h3>
      <input placeholder="Search country" value={searchTerm} onChange={handleInputChange} />
    </div>
  );
};

export default SearchBar;
