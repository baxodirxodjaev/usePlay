

export interface Movie_Type{
    Poster? : string,
    Title : string,
    Type : string,
    Year : string,
    imdbID : string
}


export interface MovieRatings{
    Source: string,
    Value: number
}

export interface Movie_Detail{
    Actors : string,
    Awards : string,
    BoxOffice? : string,
    Country : string,
    Director : string,
    Genre : string,
    Language : string,
    Plot : string,
    Poster? : string,
    Ratings : MovieRatings[]
    Released: string,
    Runtime : string,
    Title : string,
    Type : string,
    Year : string,
    Writer : string,
    imdbID : string,
    Metascore : string,
    Website? : string,
    imdbRating : string ,
    imdbVotes : string,
}


export interface Watched_Movie {
    imdbID: string;
    title: string;
    year: string;
    poster?: string;
    imdbRating: number;
    runtime: number;
    userRating: number;
    countRatingDecisions: number;
  }