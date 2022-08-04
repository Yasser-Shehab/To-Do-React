import Search from "../Search/Search";
import Select from "../Select/Select";

import { FaFilter } from "react-icons/fa";

import "./Filter.scss";

function Filter({
  showFilter,
  handleShowFilter,
  handlePrioritySort,
  handleSelect,
  onSearchChange,
}) {
  return (
    <>
      <div className="col-md-6 mx-auto">
        <div className="col-md-12 mx-auto filterBox">
          <div className="card p-3 mx-auto" onClick={handleShowFilter}>
            <FaFilter />
          </div>
        </div>
        <div className={`col-md-9 mx-auto m-3  ${showFilter ? "showfilter" : "filterBlock"}`}>
          <div className="card p-3 ">
            <Search title="Search by name" onSearchChange={onSearchChange} />
            <div>
              <label htmlFor="exampleSelect1" className="form-label mt-4">
                Sort By
              </label>
              <Select
                filter={true}
                handlePrioritySort={handlePrioritySort}
                handleSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
