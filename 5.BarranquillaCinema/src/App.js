import { useState, useEffect } from "react";

import { Search } from "./Input/Search.js";

import { Logo } from "./Presentational/Logo.js";
import { NumResults } from "./Presentational/NumResults.js";
import { WatchedSummary } from "./Presentational/WatchedSummary.js";
import { Loader } from "./Presentational/Loader.js";
import { Error } from "./Presentational/Error.js";

import { MovieList, MovieDetailed } from "./Business/Movies.js";
import { WatchedMoviesList } from "./Business/WatchedMovies.js";

import { Box } from "./Structural/Box.js";

const API_KEY = "8aed1b34";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  useEffect(
    function () {
      const controller = new AbortController();

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie();
      const waitFetch = setTimeout(async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong during loading");

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }, 500);

      return function () {
        controller.abort();
        clearTimeout(waitFetch);
      };
    },
    [query]
  );

  useEffect(() => {
    function unselectMovie(e) {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    }

    document.addEventListener("keydown", unselectMovie);

    return function () {
      document.removeEventListener("keydown", unselectMovie);
    };
  }, [handleCloseMovie]);

  function handleSelectMovie(id) {
    setSelectedID((curr_id) => (curr_id === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetailed
              onCloseMovie={handleCloseMovie}
              selectedID={selectedID}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
