import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions/index";
import "./searchBar.css";

const SearchBar = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setData(e.target.value);
    dispatch(getCountriesByName(e.target.value));
  };

  return (
    <div className="searchBar">
      <h3>Search country</h3>
      <input placeholder="Search country" value={data} onChange={handleInputChange} />
    </div>
  );
};

export default SearchBar;
