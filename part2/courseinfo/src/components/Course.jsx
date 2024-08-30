import Header from './Header'
import Content from './Content'
import Total from './Total'
import PropTypes from 'prop-types'

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

Course.propTypes = {
  courses: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        exercises: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
}

export default Course
