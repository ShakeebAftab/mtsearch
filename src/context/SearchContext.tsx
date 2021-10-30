import { createContext, useState } from "react";

export const SearchContextProvider = createContext<any>("");

export const SearchContext = ({ children }: any) => {
  const [search, setSearch] = useState<any>("");
  return (
    <SearchContextProvider.Provider value={[search, setSearch]}>
      {children}
    </SearchContextProvider.Provider>
  );
};
