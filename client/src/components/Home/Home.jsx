import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCountries, getActivitiesList, allFilters } from "../../redux/actions/index";
import Cards from "../Cards/Cards";
import "./home.css";

import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import CountrySort from "../CountrySort/CountrySort";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import ActivityFilter from "../ActivityFilter/ActivityFilter";

const Home = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);

  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivitiesList());
  }, [dispatch]);

  const [filterState, setFilterState] = useState({
    continent: [],
    sort: "Orden",
    activity: "All",
    countrySearch: "",
  });

  useEffect(() => {
    setLoading((loading) => !loading);
    dispatch(allFilters(filterState));
  }, [filterState, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  let indFirstCountry = 0;
  let indLastCountry = 0;

  if (currentPage === 1) {
    indFirstCountry = 0;
    indLastCountry = 0;
  } else {
    indFirstCountry = currentPage - 1;
    indLastCountry = currentPage - 1;
  }
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const currentCountries =
    !allCountries.length > 0
      ? []
      : allCountries.slice(indexOfFirstCountry + indFirstCountry, indexOfLastCountry + indLastCountry);

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShow((show) => !show);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <div className="home">
      <div className="home-header">
        <h1>Countries App</h1>
        <a href="/createActivity" className="buttonCreateActivity">
          Create activity
        </a>
      </div>
      <div className="home-body">
        <div className="filterAndOrder">
          <SearchBar setCurrentPage={setCurrentPage} />
          <ContinentFilter setCurrentPage={setCurrentPage} setFilterState={setFilterState} filterState={filterState} />
          <ActivityFilter setCurrentPage={setCurrentPage} setFilterState={setFilterState} filterState={filterState} />
          <CountrySort setCurrentPage={setCurrentPage} setFilterState={setFilterState} filterState={filterState} />
        </div>

        <div className="home__container">
          {currentCountries.length === 0 && !show ? (
            <div className="loadingCountries">
              <p>Loading...</p>
            </div>
          ) : currentCountries.length > 0 ? (
            <Cards currentCountries={currentCountries} />
          ) : (
            <div className="loadingCountries">
              <p>No hay coincidencias</p>
            </div>
          )}
          <Pagination
            countriesPerPage={countriesPerPage}
            allCountries={allCountries}
            paged={paged}
            key={"page" + currentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
