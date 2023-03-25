import React from "react";

const CountrySort = ({ setCurrentPage, setFilterState, filterState }) => {
  const sortedList = ["ascendName", "descendName", "ascendPob", "descendPob"];
  const sortedLabelName = ["Name Ascending", "Name Descending", "Pop. Ascending", "Pop. Descending"];

  const handleOrder = (event) => {
    setFilterState({ ...filterState, sort: event.target.value });
    setCurrentPage(1);
  };

  return (
    <div className="order">
      <h4>Order</h4>
      <div key={"sortContinet"}>
        <select onChange={(event) => handleOrder(event)}>
          <option key={"sortContinent Orden"} value="Orden">
            Order...
          </option>
          {sortedList.map((element, index) => {
            return (
              <option key={"activityFilter" + element} value={element}>
                {sortedLabelName[index]}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default CountrySort;
