import React, { useContext, useEffect } from 'react'
import { path } from '../ContextAPI/path.context'

const Settings = () => {
  const {settitle} = useContext(path)

  useEffect(()=>{
    settitle("Settings")
  },[])
  return (
    <div>
        
    </div>
  )
}

export default Settings
