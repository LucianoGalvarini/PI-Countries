import { useState } from "react";
import "./continentFilter.css";

const ContinentFilter = ({ setCurrentPage, setFilterState, filterState }) => {
  const continentsList = ["Africa", "South America", "North America", "Asia", "Europe", "Oceania", "Antarctica"];
  const [filterContinent, setFilterContinent] = useState([false, false, false, false, false, false, false]);

  const handleFilterContinent = (event) => {
    let updateCheckedState = [
      ...filterContinent.map((element, index) => (index === parseInt(event.target.id) ? !element : element)),
    ];
    setFilterContinent(updateCheckedState);

    let statusFilter = continentsList.filter((element, index) => updateCheckedState[index] === true);
    setFilterState({ ...filterState, continent: statusFilter });
    setCurrentPage(1);
  };

  return (
    <div className="filterByContinent">
      <h3>Filtering by continent</h3>
      <div className="divContinents">
        {continentsList.map((element, index) => {
          return (
            <div key={"div" + index} className="inputLabelContinent">
              <input
                key={"input" + index}
                type="checkbox"
                className="inputContinent"
                id={index}
                name={element}
                value={element}
                checked={filterContinent[index]}
                onChange={(e) => handleFilterContinent(e)}
              />
              <label key={"label" + index}>{element}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinentFilter;
