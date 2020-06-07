import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./search-field.styles.scss";

const fontstyle = {
  position: "absolute",
  color: "grey",
  left: "10px",
  top: "12px",
};

const SearchField = ({ history }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    db.doc("searchField/8KsCqlb458OsvKcFXM4V")
      .get()
      .then((doc) => setSearchArray(doc.data().searchArray));
  }, []);
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setInputValue(value);
    const filteredSuggestion = searchArray.filter((searchItem) =>
      searchItem.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestion);
    if (value === "") setSuggestions([]);
  };

  const handleSearchList = (e) => {
    setInputValue(e.target.innerText);
    setSuggestions([]);
  };

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        const str = inputValue.replace(/\s+/g, "-").toLowerCase();
        return history.push(`/search/${str}`);
      }}
    >
      {" "}
      <div>
        <FontAwesomeIcon icon={faSearch} style={fontstyle} />
        <input
          type="search"
          className="search-input"
          aria-label="Search"
          onChange={handleSearchInput}
          value={inputValue}
          placeholder="Search photos"
        />
      </div>
      <ul className="suggestion-list">
        {suggestions.map((searchList) => (
          <li className="list-item" onClick={handleSearchList}>
            {searchList}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default withRouter(SearchField);
