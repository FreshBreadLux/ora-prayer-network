import React from 'react'

const FormInputPresenter = ({ type, label, name, notEmpty, onBlur, onChange, onKeyDown, inputMode, value, step, inputRef }) => (
  <div className={notEmpty ? 'formGroup notEmpty' : 'formGroup'}>
    <input
      id={name}
      ref={inputRef}
      step={step}
      type={type}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      inputMode={inputMode}
      autoComplete="nope"
      className="formControl" />
    <label
      htmlFor={name}
      className="animatedLabel">
      {label}
    </label>
  </div>
)

export default FormInputPresenter
