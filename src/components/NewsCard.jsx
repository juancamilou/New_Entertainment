export default function NewsCard({
  article,
  translations,
  uiLanguage,
  onOpenModal,
  showToast,
}) {
  const imageUrl = article.image_url
    ? article.image_url
    : "https://via.placeholder.com/600x300/0f172a/38bdf8?text=No+Image";

  const uuid = article.uuid ? article.uuid : "No disponible";

  function copyUUID() {
    if (!article.uuid) {
      showToast(translations[uiLanguage].noUUID, "error");
      return;
    }

    navigator.clipboard
      .writeText(article.uuid)
      .then(() => showToast(translations[uiLanguage].copiedUUID, "success"))
      .catch(() => showToast("❌ Error copying UUID", "error"));
  }

  return (
    <div className="card">
      <img src={imageUrl} alt="Noticia" />

      <div className="card-content">
        <h3>{article.title}</h3>

        <p>
          {article.description
            ? article.description.substring(0, 110) + "..."
            : uiLanguage === "es"
              ? "Sin descripción disponible."
              : "No description available."}
        </p>

        <p className="uuid-text">
          <b>UUID:</b> <span className="uuid-value">{uuid}</span>
        </p>

        <div className="card-footer">
          <small>{article.source || "Unknown"}</small>

          <div className="card-actions">
            <button
              className="copy-btn"
              onClick={copyUUID}
              disabled={!article.uuid}
              style={
                !article.uuid ? { opacity: 0.4, cursor: "not-allowed" } : {}
              }
            >
              📋
            </button>

            <button className="view-btn" onClick={() => onOpenModal(article)}>
              {translations[uiLanguage].view}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
