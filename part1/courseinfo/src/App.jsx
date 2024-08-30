import PropTypes from 'prop-types'

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

Header.propTypes = {
course: PropTypes.object.isRequired
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

Part.propTypes = {
  part: PropTypes.object.isRequired
  }

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  )
}

Content.propTypes = {
  course: PropTypes.object.isRequired
}

const Total = ({ course }) => {
  return <p>Total number of exercises is {""}
    {course.parts[0].exercises +
     course.parts[1].exercises +
     course.parts[2].exercises}
    </p>
}

Total.propTypes = {
  course: PropTypes.object.isRequired
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  }



  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
