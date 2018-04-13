import React from 'react'

const FormInputPresenter = ({ type, label, name, notEmpty, onBlur, onChange, inputMode, value, step }) => (
  <div className={notEmpty ? 'formGroup notEmpty' : 'formGroup'}>
    <input
      id={name}
      step={step}
      type={type}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      inputMode={inputMode}
      className="formControl" />
    <label
      htmlFor={name}
      className="animatedLabel">
      {label}
    </label>
  </div>
)

export default FormInputPresenter
