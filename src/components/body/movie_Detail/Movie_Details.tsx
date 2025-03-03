import { useEffect, useRef, useState } from "react";
import { useKey } from "../../../hooks/useKey";
import { Movie_Detail, Watched_Movie } from "../../../type/Movie_Type";
import Star_Rate from "../../star_Rating/Star_Rate";
import Loader from "../../loader/Loader";



interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: Watched_Movie) => void;
  watched: Watched_Movie[];
}

function Movie_Details({ selectedId, onCloseMovie, onAddWatched, watched }: MovieDetailsProps) {
  const KEY = "bbf9005c";
 
  const [movie, setMovie] = useState<Movie_Detail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const countRef = useRef(0);
  useKey("Escape", onCloseMovie);


  useEffect(() => {
    if (userRating !== null) countRef.current++;
  }, [userRating]);

  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;


  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        const data: Movie_Detail = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedId]);


  useEffect(() => {
    if (!movie?.Title) return;
    document.title = `Movie | ${movie.Title}`;
    return () => {
      document.title = "usePlay";
    };
  }, [movie?.Title]);


  if (isLoading) return <Loader />;
  if (!movie) return <p>Movie not found</p>;


  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Country : country,
    Ratings : ratings,
    BoxOffice : boxOffice
  } = movie;

  function handleAdd() {
    if (!userRating) return;

    const newWatchedMovie: Watched_Movie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }


  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>Country: { country}</p>
          <p>Genre: { genre}</p>
          <p>
            <span>⭐️</span> {imdbRating} IMDb rating
          </p>
          {
            boxOffice && <p>Box Office: {boxOffice}</p>
          }
          
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <Star_Rate maxRating={10} size={24} onSetRating={setUserRating} />
              {userRating !== null && userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated this movie {watchedUserRating} <span>⭐️</span>
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
        
        <div>
            <h3>Ratings:</h3>
            {ratings.length > 0 ? (
              ratings.map((rating, index) => (
                <div key={index}>
                  <strong>{rating.Source}</strong>: {rating.Value}
                </div>
              ))
            ) : (
              <p>No ratings available</p>
            )}
        </div>

      </section>
    </div>
  );
}

export default Movie_Details;
