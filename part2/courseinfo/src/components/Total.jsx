import React from "react"

const Total = ({parts}) => {
    let total = parts.reduce((sum , part) => {
        sum = sum + part.exercises
        return sum
    } , 0)

   return (
   <strong>
    total of {total} exercises
     </strong>
  )

}

export default Total
