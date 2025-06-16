export const API_BASE_URL = "https://api.themoviedb.org/3";

export const TMDB_CONFIG = {
  BASE_URL: API_BASE_URL,
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  // API_KEY: Constants.expoConfig?.extra?.MOVIE_API_KEY,

  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmQwZjQzZGQyNjhhZDYzNjdhMDUyYTNiMDAwMzE3YSIsIm5iZiI6MTc0OTk0NTE4NC44NjUsInN1YiI6IjY4NGUwYjYwNGVmNGM0YmVlNjI5NGFhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EmWe4hr2Er4MsoNgZdIxQHmfTvJT4URs1PILHs7vPpU`,
    // Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_TOKEN}`,
    // Authorization: `Bearer ${Constants.expoConfig?.extra?.MOVIE_API_TOKEN}`,
  },
};

// export const fetchMovies = async ({ query }: { query: string }) => {
//   const baseParams = {
//     include_adult: "false",
//     include_video: "false",
//     language: "en-US",
//     page: "1",
//     sort_by: "popularity.desc",
//   };

//   const endpoint = query
//     ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&${new URLSearchParams(baseParams)}`
//     : `${TMDB_CONFIG.BASE_URL}/discover/movie?${new URLSearchParams(baseParams)}`;

//   const response = await fetch(endpoint, {
//     method: "GET",
//     headers: TMDB_CONFIG.headers,
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     // console.log("Full error response:", errorData);x
//     throw new Error(`Error fetching movies: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data.results;
// };

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    console.log("Error fetching movies:", response);
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results;
};
