import { createContext, useState } from "react";

export const SearchContextProvider = createContext<any>("");

export const SearchContext = ({ children }: any) => {
  const [search, setSearch] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  return (
    <SearchContextProvider.Provider value={[search, setSearch, page, setPage]}>
      {children}
    </SearchContextProvider.Provider>
  );
};
