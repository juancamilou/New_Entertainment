import { useEffect, useState } from "react";

import LanguageDropdown from "./components/LanguageDropdown";
import Loader from "./components/Loader";
import Navbar from "./components/navbar";
import NewsCard from "./components/NewsCard";
import NewsModal from "./components/NewsModal";
import SearchPanel from "./components/SearchPanel";
import SimilarPanel from "./components/SimilarPanel";
import Toast from "./components/Toast";

import {
  buildAllUrl,
  buildLatestUrl,
  buildSearchUrl,
  buildSimilarUrl,
  buildSourcesUrl,
  buildTopUrl,
} from "./services/newsApi";

export default function App() {
  const translations = {
    es: {
      title: "🎬 Noticias Entertainment",
      subtitle: "Explora noticias de entretenimiento en USA usando TheNewsAPI",
      languageLabel: "Idioma",
      top: "🏆 Top",
      all: "📰 Todo",
      latest: "🔥 Últimas",
      search: "🔍 Buscar",
      similar: "🎥 Similares",
      sources: "🏢 Fuentes",
      loading: "Cargando información...",
      loadMore: "Cargar más",
      readMore: "Leer noticia completa",
      source: "Fuente:",
      date: "Fecha:",
      welcome: "🎬 Bienvenido. Selecciona una opción del menú.",
      errorEmpty: "❌ No se encontraron resultados.",
      errorConnection: "⚠️ Error al conectar con la API.",
      view: "Ver más",
      searchBtn: "Buscar",
      similarBtn: "Buscar similares",
      allLang: "Todos",
      newsLang: "Idioma noticias",
      missingFilters: "⚠️ Debes ingresar al menos un filtro.",
      missingUUID: "⚠️ Debes ingresar un UUID válido.",
      copiedUUID: "✅ UUID copiado al portapapeles.",
      noUUID: "⚠️ UUID no disponible.",
      offlineNews: "📡 Sin conexión. Mostrando noticias guardadas (Offline).",
      noOfflineData: "❌ Sin conexión y no hay datos guardados.",
    },
    en: {
      title: "🎬 Entertainment News",
      subtitle: "Explore entertainment news in USA using TheNewsAPI",
      languageLabel: "Language",
      top: "🏆 Top",
      all: "📰 All",
      latest: "🔥 Latest",
      search: "🔍 Search",
      similar: "🎥 Similar",
      sources: "🏢 Sources",
      loading: "Loading information...",
      loadMore: "Load more",
      readMore: "Read full article",
      source: "Source:",
      date: "Date:",
      welcome: "🎬 Welcome. Choose an option from the menu.",
      errorEmpty: "❌ No results found.",
      errorConnection: "⚠️ API connection error.",
      view: "View",
      searchBtn: "Search",
      similarBtn: "Search similar",
      allLang: "All",
      newsLang: "News language",
      missingFilters: "⚠️ Please enter at least one filter.",
      missingUUID: "⚠️ Please enter a valid UUID.",
      copiedUUID: "✅ UUID copied to clipboard.",
      noUUID: "⚠️ UUID not available.",
      offlineNews: "📡 Offline. Showing saved news.",
      noOfflineData: "❌ Offline and no saved data found.",
    },
  };

  const CACHE_NEWS_KEY = "cachedNews";

  const [uiLanguage, setUiLanguage] = useState("es");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [sources, setSources] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastUrl, setLastUrl] = useState("");

  const [toasts, setToasts] = useState([]);

  const [activePanel, setActivePanel] = useState("");

  function showToast(message, type = "info") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }

  async function fetchNews(url, append = false) {
    try {
      setLoading(true);

      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP Error: " + res.status);

      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        showToast(translations[uiLanguage].errorEmpty, "error");
        return;
      }

      localStorage.setItem(CACHE_NEWS_KEY, JSON.stringify(data.data));

      setNews((prev) => (append ? [...prev, ...data.data] : data.data));
      setSources([]);

      setLastUrl(url);
      showToast("✅ Loaded", "success");
    } catch (err) {
      console.error(err);

      const cached = localStorage.getItem(CACHE_NEWS_KEY);

      if (cached) {
        showToast(translations[uiLanguage].offlineNews, "info");
        setNews(JSON.parse(cached));
      } else {
        showToast(translations[uiLanguage].noOfflineData, "error");
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchSources() {
    try {
      setLoading(true);
      setActivePanel("");

      const url = buildSourcesUrl();
      const res = await fetch(url);

      if (!res.ok) throw new Error("HTTP Error: " + res.status);

      const data = await res.json();

      setSources(data.data || []);
      setNews([]);
      showToast("✅ Sources loaded", "success");
    } catch (err) {
      console.error(err);
      showToast(translations[uiLanguage].errorConnection, "error");
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    if (!lastUrl) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    let newUrl = "";

    if (lastUrl.includes("&page=")) {
      newUrl = lastUrl.replace(/&page=\d+/, `&page=${nextPage}`);
    } else {
      newUrl = lastUrl + `&page=${nextPage}`;
    }

    fetchNews(newUrl, true);
  }

  function getTop() {
    setActivePanel("");
    setCurrentPage(1);
    fetchNews(buildTopUrl("en", 1));
  }

  function getAll() {
    setActivePanel("");
    setCurrentPage(1);
    fetchNews(buildAllUrl("en", 1));
  }

  function getLatest() {
    setActivePanel("");
    setCurrentPage(1);
    fetchNews(buildLatestUrl("en", 1));
  }

  function openSearchPanel() {
    setActivePanel("search");
    setSources([]);
    setNews([]);
  }

  function openSimilarPanel() {
    setActivePanel("similar");
    setSources([]);
    setNews([]);
  }

  function doSearch(filters) {
    if (
      !filters.keyword &&
      !filters.dateFrom &&
      !filters.dateTo &&
      !filters.lang
    ) {
      showToast(translations[uiLanguage].missingFilters, "error");
      return;
    }

    setActivePanel("");
    setCurrentPage(1);
    fetchNews(buildSearchUrl(filters, 1));
  }

  function doSimilar(uuid) {
    if (!uuid) {
      showToast(translations[uiLanguage].missingUUID, "error");
      return;
    }

    setActivePanel("");
    setCurrentPage(1);
    fetchNews(buildSimilarUrl(uuid, "en"));
  }

  useEffect(() => {
    showToast(translations[uiLanguage].welcome, "info");
  }, []);

  const navItems = [
    { label: translations[uiLanguage].top, onClick: getTop },
    { label: translations[uiLanguage].all, onClick: getAll },
    { label: translations[uiLanguage].latest, onClick: getLatest },
    { label: translations[uiLanguage].search, onClick: openSearchPanel },
    { label: translations[uiLanguage].similar, onClick: openSimilarPanel },
    { label: translations[uiLanguage].sources, onClick: fetchSources },
  ];

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1>{translations[uiLanguage].title}</h1>
          <p>{translations[uiLanguage].subtitle}</p>

          <div className="language-selector">
            <span className="lang-icon">🌍</span>
            <label>{translations[uiLanguage].languageLabel}</label>

            <LanguageDropdown value={uiLanguage} onChange={setUiLanguage} />
          </div>
        </div>
      </header>

      <Navbar items={navItems} />

      {activePanel === "search" && (
        <SearchPanel
          translations={translations}
          uiLanguage={uiLanguage}
          onSearch={doSearch}
        />
      )}

      {activePanel === "similar" && (
        <SimilarPanel
          translations={translations}
          uiLanguage={uiLanguage}
          onSimilar={doSimilar}
        />
      )}

      {loading && <Loader text={translations[uiLanguage].loading} />}

      <main className="news-container">
        {sources.length > 0 &&
          sources.map((source, index) => (
            <div className="card" key={index}>
              <div className="card-content">
                <h3>{source.domain || "N/A"}</h3>
                <p>
                  <b>Name:</b> {source.name || "Unknown"}
                </p>
                <p>
                  <b>Locale:</b> {source.locale || "N/A"}
                </p>
                <p>
                  <b>Categories:</b> {source.categories?.join(", ") || "N/A"}
                </p>
              </div>
            </div>
          ))}

        {news.length > 0 &&
          news.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              translations={translations}
              uiLanguage={uiLanguage}
              showToast={showToast}
              onOpenModal={setSelectedArticle}
            />
          ))}
      </main>

      {news.length > 0 && (
        <section className="load-more">
          <button className="btn load-more-btn" onClick={loadMore}>
            {translations[uiLanguage].loadMore}
          </button>
        </section>
      )}

      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        translations={translations}
        uiLanguage={uiLanguage}
      />

      <Toast toasts={toasts} />

      <footer className="footer">
        <p>
          Juan Camilo Uribe Chica | 3144615 | TheNewsAPI | Entertainment USA
        </p>
      </footer>
    </div>
  );
}
