import axios from "axios";

import { GETALLCOUNTRIES, GETCOUNTRYDETAIL, GETACTIVITIES, ALLFILTERS, GET_COUNTRY_NAME } from "./constants";

export const getCountries = () => {
  return async (dispatch) => {
    let allCountries = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GETALLCOUNTRIES,
      payload: allCountries.data,
    });
  };
};

export const postActivity = (payload) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/activity", payload);
    return response.data;
  };
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({
      type: GETCOUNTRYDETAIL,
      payload: response.data[0],
    });
  };
};

export const getActivitiesList = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/activity");
    return dispatch({
      type: GETACTIVITIES,
      payload: response.data,
    });
  };
};

export const allFilters = (payload) => {
  if (payload.countrySearch !== "") {
    return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/countries?name=${payload.countrySearch}`);
      return dispatch({
        type: ALLFILTERS,
        payload: { response: response.data, condition: payload },
      });
    };
  } else {
    return {
      type: ALLFILTERS,
      payload: { response: "", condition: payload },
    };
  }
};

export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/countries?onlyName=${name}`);
      return dispatch({
        type: GET_COUNTRY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
