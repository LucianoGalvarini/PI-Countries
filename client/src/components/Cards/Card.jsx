const Card = ({ country }) => {
  return (
    <div className="card" key={country.id}>
      <div className="card__container">
        <div className="card__header">
          <img className="card__flag" src={country.flagImg} alt="flag" />
        </div>
        <div className="card__body">
          <h5>{country.name}</h5>
          <p>
            <strong>Continent: </strong>
            {country.continent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
