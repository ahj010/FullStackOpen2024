import PropTypes from 'prop-types'

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

Total.propTypes = {
    parts: PropTypes.arrayOf(PropTypes.shape({
    exercises: PropTypes.number.isRequired
 })
).isRequired

}
export default Total
