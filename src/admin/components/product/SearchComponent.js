import { useState } from "react";
import { getSearch } from "../../../common/api/productApi";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchClick = async () => {
    const pageParam = { page: 1, size: 10 };
    const data = await getSearch(input, pageParam);
    setResults(data);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <input
        className="w-full p-2 border-2 border-gray-300 rounded-md"
        type="text"
        placeholder="검색어를 입력하세요"
        value={input}
        onChange={handleInputChange}
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearchClick}
      >
        <Link to={"/product/search"}>검색</Link>
      </button>
    </div>
  );
};

export default SearchComponent;
