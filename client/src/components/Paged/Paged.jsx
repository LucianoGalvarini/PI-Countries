import "./paged.css";

const Paged = ({ countriesPerPage, allCountries, paged, currentPage }) => {
  let pageNumbers = [];

  if (Array.isArray(allCountries)) {
    for (let i = 1; i <= Math.ceil((allCountries.length - 10) / (countriesPerPage + 1)) + 1; i++) {
      pageNumbers = [...pageNumbers, i];
    }
  } else {
    pageNumbers = [1];
  }

  if (pageNumbers.length > 1) {
    return (
      <div className="">
        {pageNumbers &&
          pageNumbers.map((num) => (
            <button
              key={"paged" + num}
              onClick={() => {
                paged(num);
              }}
              value={num}
              className="buttonPaged"
            >
              {num}
            </button>
          ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Paged;
