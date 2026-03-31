const BASE_URL = "https://api.thenewsapi.com/v1/news";
const API_TOKEN = "4J5ZEoBg0PDK1XmYaeuoIsknlTbsGCQ1gw8ZWcxa"; // <-- TU TOKEN

const LOCALE = "us";
const CATEGORY = "entertainment";
const LIMIT = 12;

export function buildTopUrl(lang = "en", page = 1) {
  return `${BASE_URL}/top?api_token=${API_TOKEN}&locale=${LOCALE}&categories=${CATEGORY}&limit=${LIMIT}&language=${lang}&page=${page}`;
}

export function buildAllUrl(lang = "en", page = 1) {
  return `${BASE_URL}/all?api_token=${API_TOKEN}&locale=${LOCALE}&categories=${CATEGORY}&limit=${LIMIT}&language=${lang}&page=${page}`;
}

export function buildLatestUrl(lang = "en", page = 1) {
  return `${BASE_URL}/all?api_token=${API_TOKEN}&locale=${LOCALE}&categories=${CATEGORY}&sort=published_at&limit=${LIMIT}&language=${lang}&page=${page}`;
}

export function buildSearchUrl({ keyword, dateFrom, dateTo, lang }, page = 1) {
  let url = `${BASE_URL}/all?api_token=${API_TOKEN}&locale=${LOCALE}&categories=${CATEGORY}&limit=${LIMIT}&sort=published_at&page=${page}`;

  if (keyword) url += `&search=${encodeURIComponent(keyword)}`;
  if (dateFrom) url += `&published_after=${dateFrom}`;
  if (dateTo) url += `&published_before=${dateTo}`;
  if (lang) url += `&language=${lang}`;

  return url;
}

export function buildSimilarUrl(uuid, lang = "en") {
  return `${BASE_URL}/similar?api_token=${API_TOKEN}&uuid=${uuid}&limit=${LIMIT}&language=${lang}`;
}

export function buildSourcesUrl() {
  return `${BASE_URL}/sources?api_token=${API_TOKEN}&locale=${LOCALE}`;
}
