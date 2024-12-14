const Notify = ({errorMessage}) => {
    if (!errorMessage) {
        return null
    }
  return (
    <h1 style={{color: 'red'}}>{errorMessage}</h1>
  )
}

export default Notify
