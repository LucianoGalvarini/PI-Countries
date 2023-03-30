import "./pagination.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Paged = ({ countriesPerPage, allCountries, paged, currentPage }) => {
  let pageNumbers = [];

  const maxPages = 5;
  const totalPages = Math.ceil((allCountries.length - 10) / (countriesPerPage + 1)) + 1;
  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = Math.min(totalPages, startPage + maxPages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <div className="paged">
      {showPrev && (
        <button onClick={() => paged(currentPage - 1)} className="buttonPaged">
          <FaAngleLeft />
        </button>
      )}
      {pageNumbers.map((num) => (
        <button
          key={"paged" + num}
          onClick={() => paged(num)}
          value={num}
          className={`buttonPaged ${num === currentPage ? "active" : ""}`}
        >
          {num}
        </button>
      ))}
      {showNext && (
        <button onClick={() => paged(currentPage + 1)} className="buttonPaged">
          <FaAngleRight />
        </button>
      )}
    </div>
  );
};

export default Paged;
