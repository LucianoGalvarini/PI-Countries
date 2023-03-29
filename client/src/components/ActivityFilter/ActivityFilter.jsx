import React from "react";
import { useSelector } from "react-redux";
import "./activityFilter.css";

const ActivityFilter = ({ setCurrentPage, setFilterState, filterState }) => {
  const allActivities = useSelector((state) => state.activitiesNamesId);

  const handleFilterActivity = (e) => {
    e.preventDefault();
    setFilterState({ ...filterState, activity: e.target.value });
    setCurrentPage(1);
  };

  return (
    <div className="filterByActivities">
      <h3>Filtering by activities</h3>
      <div className="">
        <select onChange={(e) => handleFilterActivity(e)}>
          <option key={"activityFilter All"} value="All">
            All Countries
          </option>
          {allActivities &&
            allActivities.map((elem) => {
              return (
                <option key={"activityFilter" + elem.name} value={elem.id}>
                  {elem.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default ActivityFilter;
