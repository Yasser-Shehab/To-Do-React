import Search from "../Search/Search";
import Select from "../Select/Select";
import "./Filter.scss";

function Filter({ showFilter, handleShowFilter, handlePrioritySort }) {
  return (
    <>
      <div className="col-md-6 mx-auto m-3">
        <button className="mt-3 mb-3 rounded-3 border-0 p-2" onClick={handleShowFilter}>
          Filter
        </button>
        <div className="card p-3" style={{ display: showFilter ? "none" : "block" }}>
          <Search title="Search by name" />
          <div>
            <label for="exampleSelect1" class="form-label mt-4">
              Sort By
            </label>
            <Select filter={true} handlePrioritySort={handlePrioritySort} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
