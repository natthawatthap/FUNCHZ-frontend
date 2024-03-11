import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <Search
      placeholder="Search accommodations..."
      allowClear
      enterButton="Search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
    />
  );
};

export default SearchBar;
