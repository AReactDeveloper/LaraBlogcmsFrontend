import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";
import styles from './search.module.scss';

export default function Search({ articles = [] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Preprocess tags to searchable string
  const preprocessedArticles = useMemo(() => {
    return articles.map(article => ({
      ...article,
      tagsString: article.tags?.map(tag => tag.title).join(" ") || '',
    }));
  }, [articles]);

  // Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(preprocessedArticles, {
      keys: ["title", "content", "tagsString"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [preprocessedArticles]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(query);
    setResults(searchResults.map(r => r.item));
  }, [query, fuse]);

  return (
    <div>
      <input
        type="search"
        aria-label="Search articles"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />

      {results.length === 0 && <p>No articles found.</p>}

      <ul className={styles.searchResult}>
        {results.slice(0, 5).map(article => (
          <li key={article.id} style={{ marginBottom: "1rem" }}>
            <CiFileOn size={50} />
            <Link href={'/article/' + article.slug}>
              <h3>{article.title}</h3>
              <p>{article.excerpt ? "..." :  "..."}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
