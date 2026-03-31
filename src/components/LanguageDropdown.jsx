import { useState } from "react";

export default function LanguageDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  function select(lang) {
    onChange(lang);
    setOpen(false);
  }

  return (
    <div className={`custom-dropdown ${open ? "open" : ""}`}>
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        <span>{value === "es" ? "Español" : "English"}</span>
        <span className="arrow">▼</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => select("es")}>
            Español
          </div>
          <div className="dropdown-item" onClick={() => select("en")}>
            English
          </div>
        </div>
      )}
    </div>
  );
}
