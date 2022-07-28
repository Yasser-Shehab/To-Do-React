import "./App.css";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import Todolist from "./components/Todo-list/Todolist";
import formatDate from "./utils/Utils";

//Importance
//Progress
//Filter (Importance , Progress)
//Search

// const data = [
//   {
//     id: "1",
//     title: "walk the dogs",
//     date: "December 25, 2022 23:15:30",
//     isComplete: true,
//   },
//   {
//     id: "2",
//     title: "Buy groceries",
//     date: "December 25, 2022 23:15:30",
//     isComplete: false,
//   },
//   {
//     id: "3",
//     title: "Read Atomic Habits",
//     date: "December 25, 2022 23:15:30",
//     isComplete: false,
//   },
//   {
//     id: "4",
//     title: "Meet at 2hwa",
//     date: "December 25, 2022 23:15:30",
//     isComplete: false,
//   },
// ];

const getLocalStorageData = () => {
  let localData = localStorage.getItem("list");
  if (localData) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [title, setTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [toDoData, setToDoData] = useState(getLocalStorageData);
  const today = new Date();

  const handleInput = (event) => {
    setTitle((current) => (current = event.target.value));
  };

  const handleSubmit = () => {
    if (!title) {
      console.log("Please Enter a title");
    } else if (isEdit) {
      const newList = toDoData.map((item) => {
        if (item.id === currentID) {
          const updatedItem = {
            ...item,
            title,
          };

          return updatedItem;
        }
        setTitle("");
        return item;
      });

      setToDoData(newList);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title,
        date: formatDate(today, "mm/dd/yy"),
        isComplete: false,
      };
      setTitle("");
      setToDoData([...toDoData, newItem]);
    }
  };

  const handleEdit = (id, title) => {
    setIsEdit(true);
    setTitle(title);
    setCurrentID(id);
  };

  const handleDelete = (id) => {
    setToDoData(toDoData.filter((item) => item.id !== id));
  };
  const handleComplete = (id) => {
    const newList = toDoData.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isComplete: !item.isComplete,
        };

        return updatedItem;
      }
      setTitle("");
      return item;
    });

    setToDoData(newList);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(toDoData));
  }, [toDoData]);

  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className=" col-md-12 col-sm-12">
          <h1>
            <FaUserEdit /> <br />
            To-Do-App
          </h1>
        </div>
        <div className=" col-md-6 mx-auto mt-3">
          <div className="card p-3">
            <input
              type="text"
              placeholder="Title"
              className="p-2"
              value={title}
              onChange={handleInput}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary mt-3"
              disabled={!title}
            >
              {!isEdit ? `Create Note` : `Edit Note`}
            </button>
          </div>
        </div>
      </div>
      {toDoData.length > 0 && (
        <div className="row">
          <div className=" col-md-6 mx-auto mt-3">
            <div className="card p-3">
              <Todolist
                data={toDoData}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onComplete={handleComplete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
