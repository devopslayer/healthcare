import { useState } from "react";
import Input from "../Input/Input";
import { FaSearch, FaBell } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar() {
  const [toggle, setToggle] = useState(false);

  const handleSearch = () => {
    const smallWindow = window.innerWidth <= 768;
    if (smallWindow) {
      setToggle(!toggle);
    } else {
      setToggle(false);
    }
  };

  return (
    <div
      className={`border border-gray-300 md-rounded search-bar ${
        toggle ? "open" : "close"
      }`}
    >
      <button className="search-button" onClick={handleSearch}>
        <FaSearch className="search-icon" />
      </button>
      <Input
        type="text"
        name="search"
        placeholder="Search..."
        className={`search-input ${toggle ? "show-input" : "hide-input"}`}
      />
      <button>
        <FaBell className="notification-icon" />
      </button>
    </div>
  );
}

export default SearchBar;
