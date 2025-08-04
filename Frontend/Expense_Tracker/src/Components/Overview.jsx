import React, { useContext, useEffect } from 'react'
import { path } from '../ContextAPI/path.context'

const Overview = () => {
  const {settitle} = useContext(path)
  
    useEffect(()=>{
      settitle('Overview')
    },[])
  return (
    <div>
  
    </div>
  )
}

export default Overview