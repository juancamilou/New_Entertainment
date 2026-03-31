export default function NewsModal({
  article,
  onClose,
  translations,
  uiLanguage,
}) {
  if (!article) return null;

  const imageUrl = article.image_url
    ? article.image_url
    : "https://via.placeholder.com/700x350/0f172a/38bdf8?text=No+Image";

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>

        <img src={imageUrl} alt="Imagen noticia" />
        <h2>{article.title}</h2>
        <p>{article.description || "No description available."}</p>

        <p className="modal-info">
          <b>{translations[uiLanguage].source}</b> {article.source || "Unknown"}
        </p>

        <p className="modal-info">
          <b>{translations[uiLanguage].date}</b>{" "}
          {article.published_at || "Unknown"}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="btn modal-link"
        >
          {translations[uiLanguage].readMore}
        </a>
      </div>
    </div>
  );
}
