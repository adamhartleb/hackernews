import React from 'react';

function Search({ value, onSearch, newSearch, children }) {
  return (
    <form>
      <label>Search</label>
      <input onKeyDown={newSearch}/>
      <label>Filter</label>
      <input onChange={onSearch}/>
    </form>
  )
}

export default Search;