const Notification = ({ message , error }) => {
  if (message === null && error === null) {
    return null
  }

  return (
    <div className={error ? 'error' : 'message'}>
      {error || message}
    </div>
  )
}

export default Notification
