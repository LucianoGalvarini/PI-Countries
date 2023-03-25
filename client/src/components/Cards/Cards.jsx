import Card from "./Card";
import "./cards.css";
import { Link } from "react-router-dom";

const Cards = ({ currentCountries }) => {
  return (
    <div className="cards">
      {!Array.isArray(currentCountries)
        ? currentCountries
        : currentCountries.map((country) => {
            return (
              <Link to={`/countries/${country.id}`} key={country.id} className="linkCountryID">
                <Card key={country.id} country={country} />
              </Link>
            );
          })}
    </div>
  );
};

export default Cards;
