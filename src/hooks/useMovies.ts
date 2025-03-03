import { useState, useEffect } from "react";
import { Movie_Type } from "../type/Movie_Type";

const KEY = "bbf9005c";



export function useMovies(query : string) {
  
  const [movies, setMovies] = useState<Movie_Type[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          
          setMovies(data.Search);
          setError("");
        } catch (err  ) {
          if (err instanceof Error) { // check if err is an instance of Error
            if (err.name !== "AbortError") {
              console.log(err.message);
              setError(err.message);
            }
          } else {
            //  case if err is not an instance of Error
            console.error("An unknown error occurred: ", err);
            setError("An unknown error occurred.");
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
