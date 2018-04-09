import React from 'react'

const FormInputPresenter = ({ type, label, name, notEmpty, onBlur, onChange, inputMode }) => (
  <div className={notEmpty ? 'formGroup notEmpty' : 'formGroup'}>
    <input
      type={type}
      name={name}
      inputMode={inputMode}
      onBlur={onBlur}
      onChange={onChange}
      className="formControl" />
    <label
      htmlFor={name}
      className="animatedLabel">
      {label}
    </label>
  </div>
)

export default FormInputPresenter
