import { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, tasks }) => {
  useEffect(() => {
    const clear = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(clear);
  }, [tasks]);
  return <div className={`alert alert-${type}`}>{msg}</div>;
};

export default Alert;
