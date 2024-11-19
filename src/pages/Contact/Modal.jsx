import React, { useContext, useEffect } from "react";
import { DataContext } from "../../App";
import checkmark from "../../assets/images/checkmark.svg";
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";

function Modal() {
  const { form, dispatchForm } = useContext(DataContext);

  useEffect(() => {
    if (form.showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [form.showModal]);
  return (
    <section className="modal-wrapper wrapper">
      <div className="modal-container">
        <img src={checkmark} alt="" className="checkmark" />
        <h2 className="modal-title">Thank You!</h2>
        <p className="modal-parag">
          Thank you for taking your time to share feedback on our App.
          <strong>Happy Cooking!</strong>
        </p>
        <Link
          to={`/categories`}
          className="link modal"
          onClick={() => dispatchForm({ type: "CLEAR_FORM" })}
        >
          Continue
        </Link>
        <button
          type="button"
          className="modal-btn"
          onClick={() => dispatchForm({ type: "CLOSE_MODAL" })}
        >
          <Close fontSize="large" />
        </button>
      </div>
    </section>
  );
}

export default Modal;
