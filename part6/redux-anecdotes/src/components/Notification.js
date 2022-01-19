import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  console.log('=>>>>', props.notification.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === '') {
    return null;
  } else {
    return (
      <div style={style}>
        {props.notification.message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification