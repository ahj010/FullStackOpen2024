import React from 'react'
import Header from './Header';
import Content from './Content';
import Total from './Total';

// const Header = ({ name }) => {
//     return <h1>{name}</h1>;
//   }

  // const Part = ({ part }) => {
  //   return (
  //     <p>
  //       {part.name} {part.exercises}
  //     </p>
  //   );
  // };

  // const Content = ({ parts }) => {
  //  // console.log("Parts:", parts);
  //   return (
  //     <div>
  //    {parts.map((part , id) => (
  //     <Part key={id} part={part} />
  //     ))}

  //     </div>
  //   );
  // };


  // const Total = ({parts}) => {
  //   let total = parts.reduce((sum , part) => {
  //       sum = sum + part.exercises;
  //       return sum;
  //   } , 0)

  //  return (
  //  <strong>
  //   total of {total} exercises
  //    </strong>
  // )


  // }

  const Course = ({courses}) => {
  // console.log("Courses Parts:", courses.parts);
    return(
        <>
      <Header name ={courses.name} />
      <Content parts ={courses.parts}/>
      <Total parts={courses.parts} />
        </>
    )
  }

export default Course
