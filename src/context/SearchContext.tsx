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
      ]}
    >
      {children}
    </SearchContextProvider.Provider>
  );
};
