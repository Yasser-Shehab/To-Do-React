import "./Select.scss";

function Select({ priority, handlePriority, filter, handlePrioritySort }) {
  if (filter) {
    return (
      <select className="form-select" id="exampleSelect1">
        <option>Select An Option</option>
        <option onClick={handlePrioritySort}>Priority</option>
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
