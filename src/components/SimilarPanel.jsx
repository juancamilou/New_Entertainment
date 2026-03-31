import { useState } from "react";

export default function SimilarPanel({ translations, uiLanguage, onSimilar }) {
  const [uuid, setUuid] = useState("");

  return (
    <section className="inputs">
      <input
        type="text"
        placeholder="UUID"
        value={uuid}
        onChange={(e) => setUuid(e.target.value)}
      />

      <button className="btn" onClick={() => onSimilar(uuid)}>
        {translations[uiLanguage].similarBtn}
      </button>
    </section>
  );
}
