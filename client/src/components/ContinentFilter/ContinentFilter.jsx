import { useState } from "react";
import "./continentFilter.css";

const ContinentFilter = ({ setCurrentPage, setFilterState, filterState }) => {
  const continentsList = ["Africa", "South America", "North America", "Asia", "Europe", "Oceania", "Antarctica"];
  const [filterContinent, setFilterContinent] = useState([false, false, false, false, false, false, false]);

  const handleFilterContinent = (e) => {
    let updateCheckedState = [...filterContinent.map((el, i) => (i === parseInt(e.target.id) ? !el : el))];
    setFilterContinent(updateCheckedState);

    let statusFilter = continentsList.filter((el, i) => updateCheckedState[i] === true);
    setFilterState({ ...filterState, continent: statusFilter });
    setCurrentPage(1);
  };

  return (
    <div className="filterByContinent">
      <h3>Filtering by continent</h3>
      <div className="divContinents">
        {continentsList.map((el, i) => {
          return (
            <div key={"div" + i} className="inputLabelContinent">
              <input
                key={"input" + i}
                type="checkbox"
                className="inputContinent"
                id={i}
                name={el}
                value={el}
                checked={filterContinent[i]}
                onChange={(e) => handleFilterContinent(e)}
              />
              <label key={"label" + i}>{el}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinentFilter;
