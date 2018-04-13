import React from 'react'
import Loader from 'react-loader-spinner'

const LoadingButtonPresenter = ({ isLoading, onClick, classNameProp, dimensions, color, children }) => (
  <button
    onClick={onClick}
    className={classNameProp}>
    {isLoading
    ? <Loader type="Bars" height={dimensions} width={dimensions} color={color} />
    : <div>{children}</div>
    }
  </button>
)

export default LoadingButtonPresenter
