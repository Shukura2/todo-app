import { useEffect, useState } from "react";
import Alert from "./components/Alert";
import Task from "./components/Task";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleAlert = (show, msg, type) => {
    setAlert({ show, msg, type });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      handleAlert(true, "cant add empty space", "danger");
      return;
    } else if (task && isEdit) {
      setTasks(
        tasks.map((item) => {
          if (item.id === editID) {
            return { ...item, title: task };
          }
          return item;
        })
      );
      setTask("");
      setIsEdit(false);
      setEditID(null);
    } else {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      handleAlert(true, "Task added to lists", "success");
      setTask("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    handleAlert(true, "Task removed successfully", "danger");
  };

  const handleEdit = (id) => {
    const editItem = tasks.find((task) => task.id === id);
    setTask(editItem.title);
    setIsEdit(true);
    setEditID(id);
  };

  return (
    <div className="app-wrap">
      <form className="form-wrap" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={handleAlert} tasks={tasks} />
        )}
        <h2>Todo App</h2>
        <div className="form-control">
          <input
            type="text"
            className="input"
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="submit-btn">Submit</button>
        </div>
      </form>
      {tasks.length > 0 ? (
        <div className="task-wrap">
          <Task
            tasks={tasks}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      ) : (
        <p>No task for now </p>
      )}
    </div>
  );
};

export default App;
