import { Watched_Movie } from "../../type/Movie_Type";
import WatchedMovie from "./WatchedMovie";

interface WatchedMoviesListProp{
    watched : Watched_Movie[];
    onDeleteWatched : (id:  string) => void;
}

const WatchedMoviesList =({ watched, onDeleteWatched } : WatchedMoviesListProp)=> {
    return (
      <ul className="list">

        {watched.map((movie) => (
          <WatchedMovie
             key={movie.imdbID}
            movie={movie}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
        
      </ul>
    );
  }

export default WatchedMoviesList;