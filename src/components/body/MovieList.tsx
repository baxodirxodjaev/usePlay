import { Movie_Type } from "../../type/Movie_Type";
import Movie from "./Movie";

interface MovieListProps {
    movies: Movie_Type[];
    onSelectMovie :  (id: string) => void;
}

const MovieList =({ movies, onSelectMovie} : MovieListProps) => {
    return (
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie 
            key={movie.imdbID}
            movie={movie}  
            onSelectMovie={onSelectMovie} />
        ))}
      </ul>
    );
  }

  export default MovieList;