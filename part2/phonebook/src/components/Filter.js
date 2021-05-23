import React from "react";

const Filter = ({ text, newFilter, handleFilterChange }) => {
  return (
    <div>
      {text} <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
