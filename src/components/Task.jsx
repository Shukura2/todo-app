import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Task = ({ id, title, date, handleDelete, handleEdit }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <tr>
      <td>
        {showMore ? title : title.substring(0, 40)}
        <br /> <br />
        <button onClick={() => setShowMore(!showMore)} className="show-more">
          {showMore ? "show less" : "show more"}
        </button>
      </td>
      <td>{date}</td>

      <td>
        <button
          type="button"
          className="edit-btn"
          onClick={() => handleEdit(id)}
        >
          <EditIcon />
        </button>
      </td>
      <td>
        <button
          type="button"
          className="delete-btn"
          onClick={() => handleDelete(id)}
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};

export default Task;
