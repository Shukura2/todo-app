import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Task from "./components/Task";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [date, setDate] = useState("");

  const validate = () => {
    return !task.length || !date.length;
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task && isEdit) {
      setTasks(
        tasks.map((item) => {
          if (item.id === editID) {
            return { ...item, title: task, date };
          }
          return item;
        })
      );
      setTask("");
      setDate("");
      setIsEdit(false);
      setEditID(null);
    } else {
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        date,
      };
      setTasks([...tasks, newTask]);
      const addTask = () => toast("Task added to lists");
      addTask();
      setTask("");
      setDate("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    const handleDeleteTask = () => toast("Task removed successfully");
    handleDeleteTask();
  };

  const handleEdit = (id) => {
    const editItem = tasks.find((task) => task.id === id);
    setTask(editItem.title);
    setDate(editItem.date);
    setIsEdit(true);
    setEditID(id);
  };

  return (
    <div className="container">
      <div className="app-wrap">
        <form className="form-wrap" onSubmit={handleSubmit}>
          <h2 className="title">Todo App</h2>
          <div className="form-control">
            <label className="label">Task</label>
            <input
              type="text"
              className="input"
              placeholder="Add a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <label className="label">Completion date</label>
            <br />
            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button
              variant="contained"
              disabled={validate()}
              type="submit"
              sx={{ float: "right" }}
            >
              Submit
            </Button>
          </div>
        </form>
        {tasks.length === 0 && <p className="no-items">No task for now</p>}
      </div>
      {tasks.length > 0 && (
        <div className="task-wrap">
          <table width="100%">
            <thead>
              <tr>
                <th>Task</th>
                <th>Completion date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  {...task}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
