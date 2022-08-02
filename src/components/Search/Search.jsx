import React from "react";

function Search({ title, onSearchChange }) {
  return (
    <>
      <label htmlFor="exampleInputEmail1" className="form-label ">
        {title}
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Text here..."
        onChange={onSearchChange}
      />
    </>
  );
}

export default Search;
