import './App.css'
import {  useState } from "react";
import { useLocalStorageState } from "./hooks/useLocalStorage";
import { useMovies } from "./hooks/useMovies";
import NavBar from "./components/header/Navbar";
import Search from "./components/header/Search";
import NumResults from "./components/header/NumResults";
import Main from "./components/body/Main";
import Box from "./components/body/Box";
import MovieList from "./components/body/MovieList";
import Movie_Details from "./components/body/movie_Detail/Movie_Details";
import Loader from "./components/loader/Loader";
import Error_Message from "./components/error_Message/Error_Message";
import {Watched_Movie } from "./type/Movie_Type";
import WatchedSummary from './components/body/WatchedSummary';
import WatchedMoviesList from './components/body/WatchedMoviesList';





export default function App() {


  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>( null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState<Watched_Movie[]>([], "watched");

  function handleSelectMovie(id : string ) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: Watched_Movie) {
    setWatched((prevWatched) => [...prevWatched, movie]);
  }

  function handleDeleteWatched(id : string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <Error_Message message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <Movie_Details
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}



