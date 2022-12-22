import React from 'react'

function shaffle(array:any[]) {
  return (
    [...array].sort(()=> Math.random() -0.5)
  )
}

export default shaffle
