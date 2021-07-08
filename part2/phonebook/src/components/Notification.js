import React from "react";

const Notification = ({ message }) => {
  if (message === null) return null;
  if (message.includes("Added")) {
    return <div className="add-user">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
