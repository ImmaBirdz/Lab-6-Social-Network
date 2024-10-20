import React, { useState } from 'react';
import '../css/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  

//   delete if want only search bar
  const exampleContent = [
    'POST 1',
    'POST 2',
    'POST 3',
    'POST 4',
    'POST 5',
    'POST 6',
    'POST 7'
  ];

  const Search = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="SbackgroundContainer">
      
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={Search}
          className="search-bar"
        />
        <ul className="search-results">
          {exampleContent
            .filter((content) =>
              content.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((filteredContent, index) => (
              <li key={index}>
                {filteredContent}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;