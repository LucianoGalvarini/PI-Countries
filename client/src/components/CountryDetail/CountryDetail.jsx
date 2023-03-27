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
          <p>
            <strong>Continent:</strong> {countryDetail.continent}
          </p>
          <p>
            <strong>Capital:</strong> {countryDetail.capital}
          </p>
          <p>
            <strong>Subregion:</strong> {countryDetail.subRegion}
          </p>
          <p>
            <strong>Area:</strong> {countryDetail.area} km²
          </p>
          <p>
            <strong>Population:</strong> {countryDetail.population}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
