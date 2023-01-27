const Task = ({ tasks, handleDelete, handleEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <p className="title">{task.title}</p>
          <div>
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleEdit(task.id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
