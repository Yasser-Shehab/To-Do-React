import React, { useEffect } from "react";

function Alert({ show, msg, type, removeAlert, list }) {
  useEffect(() => {
    let alertTimer = setTimeout(() => {
      removeAlert(false, "", "");
    }, 3000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [list]);
  return (
    <div className={`alert alert-dismissible ${type}`}>
      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
      <h4 className="alert-heading">{msg}!</h4>
      <p className="mb-0"></p>
    </div>
  );
}

export default Alert;
