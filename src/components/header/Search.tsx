import { useRef } from "react";
import { useKey } from "../../hooks/useKey";

const Search =({ query , setQuery } : { query: string, setQuery: (query: string) => void })=> {
    const inputEl = useRef<HTMLInputElement>(null);
  
    useKey("Enter", function () {
      if (document.activeElement === inputEl.current) return;
      inputEl.current?.focus();
      setQuery("");
    });
  
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    );
  }

  export default Search;