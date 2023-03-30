import "./paged.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Paged = ({ countriesPerPage, allCountries, paged, currentPage }) => {
  let pageNumbers = [];

  const maxPages = 5; // Máximo de 5 páginas
  const totalPages = Math.ceil((allCountries.length - 10) / (countriesPerPage + 1)) + 1;
  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2)); // Página inicial del rango visible
  let endPage = Math.min(totalPages, startPage + maxPages - 1); // Página final del rango visible

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const showPrev = currentPage > 1; // Mostrar flecha "anterior" si no se encuentra en la primera página
  const showNext = currentPage < totalPages; // Mostrar flecha "siguiente" si no se encuentra en la última página

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
