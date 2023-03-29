import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCountries } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import "./createActivity.css";

export default function CreateActivityForm() {
  const [response, setResponse] = useState({ msg: "", show: false });

  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: 1,
    duration: 1,
    season: "Summer",
    countries: [],
  });

  const [errors, setErrors] = useState({
    nameError: false,
    durationError: false,
    countryError: false,
  });

  const [suggestions, setSuggestions] = useState([{}]);
  const [inputCountry, setInputCountry] = useState({
    name: "",
    id: "",
    img: "",
  });
  const [enableSuggestion, setEnableSuggestion] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    checkForErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityData, inputCountry]);

  useEffect(() => {
    if (response.show && response.msg !== "") {
      setTimeout(() => {
        setResponse({ ...response, show: false });
        setTimeout(() => {
          setResponse({ msg: "", show: false });
        }, 3000);
      }, 3000);
    }
  }, [response]);

  useEffect(() => {
    if (inputCountry.name.length) {
      axios.get(`http://localhost:3001/countries?onlyName=${inputCountry.name}`).then((response) => {
        if (response.data.length) {
          setSuggestions(response.data);
        } else setSuggestions([]);
      });
    } else {
      setInputCountry({ name: "", id: "", img: "" });
      setSuggestions([]);
    }

    if (suggestions.includes(inputCountry)) setEnableSuggestion(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputCountry.name]);

  const handleInputCountry = (e) => {
    suggestions.forEach((sugg) => {
      if (sugg.name.toLowerCase() === e.target.innerText.toLowerCase()) {
        setInputCountry({ name: e.target.innerText, id: e.target.id });
        setSuggestions([]);
        setEnableSuggestion(false);
      }
    });
  };

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (e) => {
    setInputCountry({ ...inputCountry, name: e.target.value });
    suggestions.forEach((sugg) => {
      if (sugg.name.toLowerCase() === e.target.value.toLowerCase()) {
        setEnableSuggestion(false);
      } else {
        setEnableSuggestion(true);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (response.show === true) return;
    if (!errors.nameError && !errors.durationError && !errors.countryError) {
      axios
        .post("http://localhost:3001/activity", {
          ...activityData,
          difficulty: activityData.difficulty.toString(),
        })
        .then(({ data }) => {
          let msg;
          if (data) {
            msg = `The activity was successfully created`;
          } else {
            msg = `The activity was not created`;
          }

          setResponse({ msg, show: true });
          setActivityData({
            name: "",
            difficulty: 1,
            duration: 1,
            season: "Summer",
            countries: [],
          });

          setInputCountry({ name: "", id: "", img: "" });
          setSuggestions([]);
          dispatch(getCountries());
        })
        .catch((error) => console.log(error));
    } else {
      setResponse({ msg: "Form incomplete", show: true });
    }
  };

  const checkForErrors = () => {
    let newErrors = { ...errors };
    if (!activityData.name.length) {
      newErrors.nameError = true;
    } else {
      newErrors.nameError = false;
    }

    if (!activityData.countries.length) {
      newErrors.countryError = true;
    } else {
      newErrors.countryError = false;
    }

    if (activityData.duration < 1 || activityData.duration > 72) {
      newErrors.durationError = true;
    } else {
      newErrors.durationError = false;
    }

    setErrors(newErrors);
  };

  const handleAddCountry = (e) => {
    e.preventDefault();
    suggestions.forEach((sugg) => {
      if (sugg.name === inputCountry.name) {
        if (!activityData.countries.find((country) => country.id === sugg.id)) {
          setActivityData({
            ...activityData,
            countries: [...activityData.countries, { name: sugg.name, id: sugg.id, img: sugg.flagImg }],
          });
          setInputCountry({ name: "", id: "", img: "" });
        }
      }
    });
  };

  const handleRemoveCountry = (e) => {
    e.preventDefault();
    const deleteCountryId = e.target.id.split("-")[1];
    setActivityData({
      ...activityData,
      countries: activityData.countries.filter((country) => country.id !== deleteCountryId),
    });
  };

  return (
    <>
      <div className="divActivity">
        <a href="/home" className="country-detail-button">
          Back
        </a>
        <h2>{response.msg}</h2>
        <form onSubmit={handleSubmit} className="formActivity">
          <h1>Create Activity</h1>
          <div className="formDivs">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={activityData.name}
              onChange={handleChange}
              placeholder="Name of the activity..."
              autoFocus
            />
          </div>
          <div className="formDivs">
            <label htmlFor="difficulty">Difficulty:</label>
            <select name="difficulty" id="selectDifficulty" onClick={handleChange}>
              <option name="difficulty" value="1">
                1
              </option>
              <option name="difficulty" value="2">
                2
              </option>
              <option name="difficulty" value="3">
                3
              </option>
              <option name="difficulty" value="4">
                4
              </option>
              <option name="difficulty" value="5">
                5
              </option>
            </select>
          </div>
          <div className="formDivs">
            <label htmlFor="duration">Duration (hours) :</label>
            <input
              type="number"
              min={1}
              max={72}
              value={activityData.duration}
              onChange={handleChange}
              name="duration"
            />
          </div>
          <div className="formDivs">
            <label>Season:</label>
            <div className="divSeasons">
              <label htmlFor="Summer" className="labelSeason">
                Summer
                <input
                  type="radio"
                  id="Summer"
                  value="Summer"
                  name="season"
                  onChange={handleChange}
                  checked={activityData.season === "Summer"}
                />
              </label>
              <label htmlFor="Autumn" className="labelSeason">
                Autumn
                <input
                  type="radio"
                  id="Autumn"
                  value="Autumn"
                  name="season"
                  onChange={handleChange}
                  checked={activityData.season === "Autumn"}
                />
              </label>
              <label htmlFor="Winter" className="labelSeason">
                Winter
                <input
                  type="radio"
                  id="Winter"
                  value="Winter"
                  name="season"
                  onChange={handleChange}
                  checked={activityData.season === "Winter"}
                />
              </label>
              <label htmlFor="Spring" className="labelSeason">
                Spring
                <input
                  type="radio"
                  id="Spring"
                  value="Spring"
                  name="season"
                  onChange={handleChange}
                  checked={activityData.season === "Spring"}
                />
              </label>
            </div>
          </div>

          <div className="formDivs">
            <label htmlFor="countriesSelected">Select country</label>
            <div>
              <div className="divAddCountry">
                <input
                  onChange={handleCountryChange}
                  onFocus={() => setEnableSuggestion(true)}
                  value={inputCountry.name}
                  type="text"
                  name="countrySelection"
                  id="countrySelection"
                  autoComplete="off"
                />
                <button onClick={handleAddCountry} className="country-detail-button addCountryButton">
                  Add
                </button>
              </div>
              <div className="countrySuggestion">
                {enableSuggestion &&
                  suggestions.map((item, index) => (
                    <div key={index} id={item.id} onClick={handleInputCountry}>
                      <img src={item.flagImg} alt={`${item.name} flag`} />
                      <span>{item.name} </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="countryAdd">
              {activityData.countries.map((country, index) => (
                <div key={index}>
                  <img src={country.img} alt={`${country.name} flag`} />
                  <h4 id={country.id}>{country.name}</h4>
                  <button
                    className="country-detail-button removeButton"
                    id={`remove-${country.id}`}
                    onClick={handleRemoveCountry}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="country-detail-button createButton">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
