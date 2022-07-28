import React from "react";
import "./ListItem.scss";
import { FaEdit, FaTrash } from "react-icons/fa";

function ListItem({ title, date, id, isComplete, onDelete, onEdit, onComplete }) {
  return (
    <div
      className="itemContainer"
      style={{
        textDecoration: isComplete ? "line-through" : "none",
      }}
    >
      <div className=" card ">
        <div className="listItem">
          <div
            className="listContent"
            onClick={() => onComplete(id)}
            style={{ color: isComplete ? "green" : "black" }}
          >
            <p>{title}</p>
            <p className="date">{date}</p>
          </div>
          <ul className="listIcons">
            <li onClick={() => onEdit(id, title)}>
              <FaEdit />
            </li>
            <li onClick={() => onDelete(id)}>
              <FaTrash />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
