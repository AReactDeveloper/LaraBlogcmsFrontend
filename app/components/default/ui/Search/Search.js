"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";
import styles from './search.module.scss'


export default function Search({articles}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(articles);

  // Configure Fuse
  const fuse = useMemo(() => {
    return new Fuse(articles, {
      keys: ["title", "content", "tags"], // fields to search in
      threshold: 0.3,  // adjust fuzziness (0 = exact, 1 = very fuzzy)
      includeScore: true,
    });
  }, [articles]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = fuse.search(query);
    setResults(searchResults.map((result) => result.item));
  }, [query, fuse, articles]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />

      {results.length === 0 && <p>No articles found.</p>}

      <ul className={styles.searchResult}>
        {results.slice(0,5).map((article) => (
          <li key={article.id} style={{ marginBottom: "1rem" }}>
            <CiFileOn size={50} />
            <Link href={'/article/'+article.slug}>
                <h3>{article.title}</h3>
                <p>{article.excerpt.slice(0,90) + '....' || article.content.slice(0, 100) + "..."}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
