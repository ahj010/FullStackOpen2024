import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'


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
