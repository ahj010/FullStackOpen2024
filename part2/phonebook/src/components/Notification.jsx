import PropTypes from 'prop-types'

const successStyle = {
  color: 'green',
  background: 'black',
  font_size: 30,
  font_style: 'bold',
  border_style: 'solid',
  padding: 10,
  margin_bottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'black',
  font_size: 30,
  font_style: 'bold',
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({ message  }) => {
    if (message === null) {
      return null
    }

    if (message.includes('ERROR')){
      return (
        <div style={errorStyle} className="error">
          {message}
        </div>
      )
    } else {
      return (
        <div style={successStyle} className="error">
           {message}
        </div>
      )
    }
  }

  Notification.propTypes = {
    message: PropTypes.string,
}

export default Notification
