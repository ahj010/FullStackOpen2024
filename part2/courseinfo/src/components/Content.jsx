import PropTypes from 'prop-types'

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

Part.propTypes = {
  part: PropTypes.shape({
    name: PropTypes.string.isRequired,
    exercises: PropTypes.number.isRequired
  }).isRequired
}

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

   Content.propTypes = {
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        exercises: PropTypes.number.isRequired
      })
    ).isRequired
  }

export default Content
