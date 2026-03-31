import { useState } from "react";

export default function SearchPanel({ translations, uiLanguage, onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [langDropdown, setLangDropdown] = useState(false);
  const [lang, setLang] = useState("");

  const langLabel =
    lang === "en"
      ? "English"
      : lang === "es"
        ? "Español"
        : translations[uiLanguage].allLang;

  function handleSearch() {
    onSearch({ keyword, dateFrom, dateTo, lang });
  }

  return (
    <section className="inputs">
      <input
        type="text"
        placeholder={
          uiLanguage === "es"
            ? "Palabra clave (opcional)"
            : "Keyword (optional)"
        }
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
      />

      <div
        className={`custom-dropdown search-dropdown ${langDropdown ? "open" : ""}`}
      >
        <button
          className="dropdown-btn"
          onClick={() => setLangDropdown(!langDropdown)}
        >
          <span>{langLabel}</span>
          <span className="arrow">▼</span>
        </button>

        {langDropdown && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => {
                setLang("");
                setLangDropdown(false);
              }}
            >
              {translations[uiLanguage].allLang}
            </div>
            <div
              className="dropdown-item"
              onClick={() => {
                setLang("en");
                setLangDropdown(false);
              }}
            >
              English
            </div>
            <div
              className="dropdown-item"
              onClick={() => {
                setLang("es");
                setLangDropdown(false);
              }}
            >
              Español
            </div>
          </div>
        )}
      </div>

      <button className="btn" onClick={handleSearch}>
        {translations[uiLanguage].searchBtn}
      </button>
    </section>
  );
}
