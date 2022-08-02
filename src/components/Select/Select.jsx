import "./Select.scss";

function Select({ priority, filter, handleSelect, handlePriority }) {
  if (filter) {
    return (
      <select className="form-select" id="exampleSelect1" onChange={handleSelect}>
        <option>Select An Option</option>
        <option value={"priority"}>Priority</option>
      </select>
    );
  }
  return (
    <>
      <select
        className="form-select"
        id="exampleSelect1"
        value={priority}
        onChange={handlePriority}
      >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
    </>
  );
}

export default Select;
