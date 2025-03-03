import { Movie_Type } from "../../type/Movie_Type";


interface NumResults{
    movies : Movie_Type[]
}

function NumResults({ movies } : NumResults) {
    return (
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    );
  }

  export default NumResults;