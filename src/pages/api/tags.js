import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "quotes.json");
    const quotes = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const allTags = [...new Set(quotes.flatMap((quote) => quote.tags))];

    res.status(200).json({ tags: allTags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to load tags" });
  }
}
