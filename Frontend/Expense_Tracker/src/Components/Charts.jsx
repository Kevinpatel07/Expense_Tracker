import React, { useContext, useEffect } from 'react'
import { path } from '../ContextAPI/path.context'

const Charts = () => {
  const {settitle} = useContext(path)

  useEffect(()=>{
    settitle("Charts")
  },[])
  return (
    <div>
      <h1>Charts</h1>
    </div>
  )
}

export default Charts
