import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./countryDetail.css";

import { getCountryDetail } from "../../redux/actions/index";

const CountryDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const countryDetail = useSelector((state) => state.countryDetail);

  // id, name, flagImg, continent, capital, subRegion, area, population

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch]);

  return (
    <div className="country-detail-container">
      <a href="/home" className="country-detail-button">
        Volver
      </a>
      <div className="country-background">
        <h1 className="country-name">{countryDetail.name}</h1>
        <img className="country-flag" src={countryDetail.flagImg} alt={`${countryDetail.name} flag`} />
        <div className="country-info">
          <div className="divInfoCountries">
            <label>Continent:</label> <span>{countryDetail.continent}</span>
          </div>
          <div className="divInfoCountries">
            <label>Capital:</label> <span>{countryDetail.capital}</span>
          </div>
          <div className="divInfoCountries">
            <label>Subregion:</label> <span>{countryDetail.subRegion}</span>
          </div>
          <div className="divInfoCountries">
            <label>Area:</label> <span>{countryDetail.area} km²</span>
          </div>
          <div className="divInfoCountries">
            <label>Population:</label> <span>{countryDetail.population}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
