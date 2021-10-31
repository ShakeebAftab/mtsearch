import { createContext, useState } from "react";
import { MovieType } from "../components/types";

export const SearchContextProvider = createContext<any>("");

export const SearchContext = ({ children }: any) => {
  const [search, setSearch] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [openMovieDetails, setOpenMovieDetails] = useState<MovieType | null>(
    null
  );
  const [openDetails, setOpenDetails] = useState(false);
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [genre, setGenre] = useState("ALL");
  return (
    <SearchContextProvider.Provider
      value={[
        search,
        setSearch,
        page,
        setPage,
        openDetails,
        setOpenDetails,
        openMovieDetails,
        setOpenMovieDetails,
        movies,
        setMovies,
        genre,
        setGenre,
      ]}
    >
      {children}
    </SearchContextProvider.Provider>
  );
};
