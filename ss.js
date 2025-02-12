

const { getJson } = require("serpapi");

getJson({
  engine: "google_news",
  q: "pizza",
  gl: "us",
  hl: "en",
  api_key: "ac297d92e17eeec5536517574b560f560b863c0de8575884503724302442676f"
}, (json) => {
  console.log(json["news_results"]);
});