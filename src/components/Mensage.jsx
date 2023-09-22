import React from 'react'

const Mensage = ({children, type}) => {
  return (
    <div className={`alert ${type}`}>{children}</div>
  )
}

export default Mensage
