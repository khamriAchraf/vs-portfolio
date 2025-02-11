import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "quotes.json");
  const quotes = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const { themes } = req.query; // Get themes from query params
  const selectedThemes = themes ? themes.split(",") : [];

  // Filter quotes that match at least one selected theme
  const filteredQuotes = quotes.filter((quote) =>
    quote.tags.some((tag) => selectedThemes.includes(tag))
  );

  console.log(filteredQuotes.length);
  // Pick a random quote from filtered results (or fallback)
  const randomQuote =
    filteredQuotes.length > 0
      ? filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
      : quotes[Math.floor(Math.random() * quotes.length)];

  res.status(200).json(randomQuote);
}
