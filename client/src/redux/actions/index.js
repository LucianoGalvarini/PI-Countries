import axios from "axios";
import { GETALLCOUNTRIES, GETCOUNTRYDETAIL, GETACTIVITIES, ALLFILTERS, GET_COUNTRY_NAME } from "./constants";

const API_URL = "http://localhost:3001/";

export const getCountries = () => {
  return async (dispatch) => {
    let response = await axios.get(API_URL + "countries");
    return dispatch({
      type: GETALLCOUNTRIES,
      payload: response.data,
    });
  };
};

export const postActivity = (payload) => {
  return async () => {
    const response = await axios.post(API_URL + "activity", payload);
    return response.data;
  };
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(API_URL + `countries/${id}`);
    return dispatch({
      type: GETCOUNTRYDETAIL,
      payload: response.data[0],
    });
  };
};

export const getActivitiesList = () => {
  return async (dispatch) => {
    const response = await axios.get(API_URL + "activity");
    return dispatch({
      type: GETACTIVITIES,
      payload: response.data,
    });
  };
};

export const allFilters = (payload) => {
  if (payload.countrySearch !== "") {
    return async (dispatch) => {
      const response = await axios.get(API_URL + `countries?name=${payload.countrySearch}`);
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
      let response = await axios.get(API_URL + `countries?onlyName=${name}`);
      return dispatch({
        type: GET_COUNTRY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
