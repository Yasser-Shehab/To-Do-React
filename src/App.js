import "./App.css";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import Todolist from "./components/Todo-list/Todolist";
import formatDate from "./utils/Utils";
import Alert from "./components/Alert/Alert";
import Filter from "./components/Filter/Filter";
import Select from "./components/Select/Select";

//Importance
//Progress
//Filter (Importance , Progress)
//Search

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
  const [priority, setPriority] = useState(2);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentID, setCurrentID] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [toDoData, setToDoData] = useState(getLocalStorageData);
  const [FilteredData, setFilteredData] = useState(toDoData);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const today = new Date();

  const handleInput = (event) => {
    setTitle((current) => (current = event.target.value));
  };

  const handlePriority = (event) => {
    setPriority((current) => (current = event.target.value));
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
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
            priority,
          };

          return updatedItem;
        }
        setTitle("");
        return item;
      });
      setIsEdit(false);
      setPriority(2);
      setToDoData(newList);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title,
        date: formatDate(today, "mm/dd/yy"),
        isComplete: false,
        priority: priority,
      };
      setTitle("");
      setPriority(2);
      setToDoData([...toDoData, newItem]);
      showAlert(true, "alert-success", "Item created successfuly");
    }
  };

  const handleEdit = (id, title, priority) => {
    setIsEdit(true);
    setTitle(title);
    setPriority(priority);
    setCurrentID(id);
  };

  const handleDelete = (id) => {
    setToDoData(toDoData.filter((item) => item.id !== id));
    showAlert(true, "alert-info", "Item was deleted");
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
  const handleShowFilter = () => {
    setShowFilter((current) => (current = !current));
  };

  const handlePrioritySort = () => {
    const priorityAscending = [...toDoData].sort((a, b) => a.priority - b.priority);
    setToDoData(priorityAscending);
    // setToDoData(toDoData.sort((a, b) => a.priority - b.priority));
  };
  const handleSelect = (event) => {
    const { value } = event.target;

    if (value == "priority") {
      handlePrioritySort();
    }
  };

  const onSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(() => value.toLocaleUpperCase());
  };

  useEffect(() => {
    const newFilteredNotes = toDoData.filter((item) => {
      return item.title.toLocaleUpperCase().includes(searchTerm);
    });
    setFilteredData(() => newFilteredNotes);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(toDoData));
    setFilteredData(getLocalStorageData());
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
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={toDoData} />}
            <input
              type="text"
              placeholder="Title"
              className="p-2 mb-2"
              value={title}
              onChange={handleInput}
            />
            <Select priority={priority} handlePriority={handlePriority} />
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
        <div className="row ">
          <Filter
            showFilter={showFilter}
            handleShowFilter={handleShowFilter}
            handlePrioritySort={handlePrioritySort}
            handleSelect={handleSelect}
            onSearchChange={onSearchChange}
          />
        </div>
      )}
      {FilteredData.length > 0 && (
        <div className="row">
          <div className=" col-md-6 mx-auto m-3">
            <div className="card p-3">
              <Todolist
                data={FilteredData}
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
