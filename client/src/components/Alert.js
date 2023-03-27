import React, { useEffect } from 'react'
function Alert({ msg , type , removeAlert }) {
  console.log('Hello');
  useEffect(() => {
    const timeOut  = setTimeout(() => {
        removeAlert();
    } , 2000)
  
    return () => {
      clearTimeout(timeOut);
    }

  }, [])
  
  return (
    <div className = {`alert ${type}`}>
     {msg}
    </div>
  )
}

export default Alert