import React, { useContext } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "./form.css";
function FormCard() {
  const { isDark } = useContext(ThemeAppContext);
  const { form, dispatchForm } = useContext(DataContext);
  const { fullName, email, phone, message } = form.formData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9 ]{7,15}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchForm({ type: "UPDATE_FORM", payload: { name, value } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        dispatchForm({ type: "SHOW_MODAL" });
        
    } else {
      return;
    }
    
  };

  const validate = () => {
    const newValid = { ...form.isValid };
    if (!fullName.trim()) {
      newValid.fullName = false;
    }
    if (!message.trim()) {
      newValid.message = false;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      newValid.email = false;
    }
    if (!phone.trim() || !phoneRegex.test(phone)) {
      newValid.phone = false;
    }
    dispatchForm({ type: "VALIDATE_FORM", newValid });
    const isValid = Object.values(newValid).every(Boolean);
    return isValid;
  };
  const fieldsData = [
    {
      id: 0,
      name: "fullName",
      value: fullName,
      label: "Full Name",
      placeholder: "Peter Johns",
      type: "input",
    },

    {
      id: 1,
      name: "email",
      value: email,
      label: "Email",
      placeholder: "peterjohns@gmail.com",
      type: "input",
    },
    {
      id: 2,
      name: "phone",
      value: phone,
      label: "Phone",
      placeholder: "+123 456 7890",
      type: "input",
    },
    {
      id: 3,
      name: "message",
      value: message,
      label: "Message",
      placeholder: "I think this recipe app is...",
      type: "textarea",
    },
  ];
  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      {fieldsData.map((field) => {
        const isValid = form.isValid[field.name];
        return (
          <fieldset key={field.id} className="field">
            <label
              className={`form-label ${!isDark && "light-text"}`}
              htmlFor={field.id}
            >
              {field.label}
            </label>
            {field.type === "input" ? (
              <input
                type="text"
                id={field.id}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`form-input ${!isDark && "light-input"} ${
                  !isValid && "error-border"
                }`}
              />
            ) : (
              <div className="message-field">
                <textarea
                  id={field.id}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={6}
                  className={`form-message ${!isDark && "light-input"} ${
                    !isValid && "error-border"
                  }`}
                />
              </div>
            )}
            {!isValid && (
              <span className="error-message">
                Please provide a valid {field.label.toLowerCase()}
              </span>
            )}
          </fieldset>
        );
      })}
      <fieldset className="btn-field">
        <button
          type="button"
          className={`clear-btn form-btn ${!isDark && "light-text"}`}
          onClick={() => dispatchForm({ type: "CLEAR_FORM" })}
        >
          Clear Form
        </button>
        <button type="submit" className="link form-btn">
          Submit
        </button>
      </fieldset>
    </form>
  );
}

export default FormCard;
