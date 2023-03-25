import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCountries, getActivitiesList, allFilters } from "../../redux/actions/index";
import Cards from "../Cards/Cards";
import "./home.css";

import Paged from "../Paged/Paged";
import CountrySort from "../Sort/Sort";
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

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  //Estado local para los filtros
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

  const handleClick = (event) => {
    dispatch(getCountries());
    window.location.reload();
  };

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
      <div className="filterAndOrder">
        <ContinentFilter setCurrentPage={setCurrentPage} setFilterState={setFilterState} filterState={filterState} />
        <ActivityFilter setCurrentPage={setCurrentPage} setFilterState={setFilterState} filterState={filterState} />
        <CountrySort setCurrentPage={setCurrentPage} setFilterState={setFilterState} filterState={filterState} />
      </div>

      <div className="home__container">
        {currentCountries.length === 0 && !show ? (
          <div className="">
            <p>Loading...</p>
          </div>
        ) : currentCountries.length > 0 ? (
          <Cards currentCountries={currentCountries} />
        ) : (
          <div className="">
            <p>Loading...</p>
            <h4>"No hay coincidencias"</h4>
          </div>
        )}
        <Paged
          countriesPerPage={countriesPerPage}
          allCountries={allCountries}
          paged={paged}
          key={"page" + currentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Home;
