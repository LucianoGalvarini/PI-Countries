import { sortedCountries, filterByActivity, filterByContinent } from "../../utils/Utils.jsx";
import {
  GETALLCOUNTRIES,
  POSTACTIVITY,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
  ALLFILTERS,
  GET_COUNTRY_NAME,
} from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: {},
  activitiesNamesId: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCOUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case ALLFILTERS:
      let countries = action.payload.condition.countrySearch === "" ? state.allCountries : action.payload.response;

      if (action.payload.condition.continent.length !== 0) {
        countries = filterByContinent(action.payload.condition.continent, countries);
      }
      if (action.payload.condition.activity !== "All") {
        countries = filterByActivity(action.payload.condition.activity, countries);
      }

      if (action.payload.condition.sort !== "Orden") {
        countries = sortedCountries(action.payload.condition.sort, countries);
      }

      return {
        ...state,
        countries: countries,
      };

    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    case POSTACTIVITY:
      return {
        ...state,
      };

    case GETCOUNTRYDETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    case GETACTIVITIES:
      if (action.payload[0] !== "No hay actividades guardadas") {
        return {
          ...state,
          activitiesNamesId: action.payload,
        };
      }
    // eslint-disable-next-line
    default:
      return state;
  }
};

export default rootReducer;
