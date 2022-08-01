import React from "react";

function Search({ title }) {
  return (
    <>
      <label for="exampleInputEmail1" className="form-label ">
        {title}
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Text here..."
      />
    </>
  );
}

export default Search;
