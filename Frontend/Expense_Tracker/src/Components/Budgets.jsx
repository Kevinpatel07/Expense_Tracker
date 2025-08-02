import React, { useContext, useEffect } from 'react'
import { path } from '../ContextAPI/path.context'

const Budgets = () => {
  const {settitle} = useContext(path)

  useEffect(()=>{
    settitle("Budgets")
  })
  return (
    <div>
      
    </div>
  )
}

export default Budgets
