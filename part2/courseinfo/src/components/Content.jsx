import React from "react"

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};


const Content = ({ parts }) => {
    // console.log("Parts:", parts)
     return (
       <div>
      {parts.map((part , id) => (
       <Part key={id} part={part} />
       ))}

       </div>
     )
   }

export default Content
