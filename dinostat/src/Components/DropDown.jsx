import React from 'react';

export default function Dropdown({
  filterSuggestion, setFilterSelect,
}) {
  return (

    <select size="3" onChange={(e) => setFilterSelect(e.target.value)}>
      {({ filterSuggestion }.length === 0) ? (
        null
      ) : (
        filterSuggestion.map((dino) => (
          <option key={dino.key + dino.value} value={`${dino.key}: ${dino.value}`}>
            {`${dino.key} ${dino.value}`}
          </option>
        )))}
    </select>

  );
}
