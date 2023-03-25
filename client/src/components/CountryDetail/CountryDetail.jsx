import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCountryDetail } from "../../redux/actions/index";

const CountryDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const countryDetail = useSelector((state) => state.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch]);

  return (
    <div>
      <h1>Country Detail</h1>
    </div>
  );
};

export default CountryDetail;
