import React from 'react'

const FormInputPresenter = ({ type, label, name, notEmpty, onBlur, onChange, onKeyDown, inputMode, value, step, inputRef }) => {
  console.log('in FormInputPresenter, inputRef: ', inputRef)
  console.log('in FormInputPresenter, label: ', label)
  return (
  <div className={notEmpty ? 'formGroup notEmpty' : 'formGroup'}>
    <input
      id={name}
      inputRef={inputRef}
      step={step}
      type={type}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      inputMode={inputMode}
      className="formControl" />
    <label
      htmlFor={name}
      className="animatedLabel">
      {label}
    </label>
  </div>
)}

export default FormInputPresenter
