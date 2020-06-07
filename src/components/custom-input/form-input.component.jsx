import React, { useState } from "react";

import "./form-input.styles.scss";

const FormInput = ({ type, name, label, handleChange }) => {
  const [typing, setTyping] = useState(false);

  const handleInput = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setTyping(false);
    }
    else
    setTyping(true);
  };

  return (
    <div className="form-input">
      <input
        type={type}
        name={name}
        onChange={handleChange}
        onInput={handleInput}    
        className="input-element"
      />
      {label ? (
        <label className={`${typing ? "shrink" : ""} label-element`}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
