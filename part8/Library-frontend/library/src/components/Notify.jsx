const Notify = ({errorMessage}) => {
    if (!errorMessage) {
        return null
    }
  return (
    <h1>{errorMessage}</h1>
  )
}

export default Notify
