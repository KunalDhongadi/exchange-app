import React, { useEffect, useState } from 'react'

const Toast = () => {

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        if (showToast) {
          const timer = setTimeout(() => {
            setShowToast(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [showToast]);

  return (
    <div>Toast</div>
  )
}

export default Toast