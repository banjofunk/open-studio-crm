import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom'
import { getLocation } from 'actions/locations'
import * as actions from 'actions/rooms';
import { editRoomPath } from 'utils/appPaths'
import { Alert, Button, Divider, Label, NonIdealState, Spinner, Intent } from '@blueprintjs/core'
import '../../locations.scss'

const mapDispatchToProps = dispatch => ({
 getLocation: bindActionCreators(getLocation, dispatch),
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  location: state.location.location,
  room: state.room.room,
  fetching: state.room.fetching,
  fetched: state.room.fetched,
  redirect: state.room.redirect,
})

class RoomContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openDialog: false
    }
  }
  componentDidMount(){
    const { actions, location, match, room, fetched } = this.props
    const { locationId, roomId } = match.params
    const locationLoaded = location.id === parseInt(locationId)
    const roomLoaded = room.id === parseInt(roomId)
    if(!fetched || !locationLoaded) { getLocation(locationId) }
    if(!fetched || !roomLoaded) { actions.getRoom(roomId) }
  }

  componentDidUpdate(prevProps){
    const { actions, redirect } = this.props
    if(redirect) { actions.resetRedirect() }
  }

  showAlert = () => this.setState({ openDialog: true })
  cancelDelete = () => this.setState({ openDialog: false })
  confirmDelete = () => {
    const { actions, room } = this.props
    actions.deleteRoom(room.id)
    this.setState({ openDialog: false })
  }

  render() {
    const { room, fetching, match, redirect } = this.props
    const { openDialog } = this.state
    const { locationId, roomId } = match.params
    if(redirect){ return( <Redirect to={redirect} /> ) }
    return(
      <div className={'content'}>
        {fetching &&
              <NonIdealState
                children={<Spinner size={20} intent={Intent.PRIMARY} />}
                title="Loading" />
        }
        {!fetching &&
          <div>

            <div className={'content-header'}>

              <Label className={'class-type-show-header'}>
                <h2>{room.name}</h2>
                <div className={'header-buttons'}>
                  <Link to={editRoomPath(locationId, roomId)}>
                    <Button
                      icon={'edit'}
                      minimal={true}
                      small={true}
                      intent={Intent.PRIMARY} />
                  </Link>
                  <Button
                    icon={'trash'}
                    small={true}
                    minimal={true}
                    onClick={this.showAlert}
                    intent={Intent.DANGER} />
                  </div>
              </Label>
              <Divider />
            </div>
            <Label className={'product-show-label'}>
              Name:
              <span>{room.name}</span>
            </Label>
            <Label className={'product-show-label'}>
              Accepts Classes:
              <span>{room.acceptsClasses ? 'yes' : 'no'}</span>
            </Label>
            <Label className={'product-show-label'}>
              Accepts Appointments:
              <span>{room.acceptsAppointments ? 'yes' : 'no'}</span>
            </Label>
            <Label className={'product-show-label'}>
              Accepts Enrollments:
              <span>{room.acceptsEnrollments ? 'yes' : 'no'}</span>
            </Label>
            <Label className={'product-show-label'}>
              Has Schedules:
              <span>{room.hasSchedules ? 'yes' : 'no'}</span>
            </Label>
        </div>
      }
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Delete Room"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={openDialog}
        onCancel={this.cancelDelete}
        onConfirm={this.confirmDelete}>
        <p>Are you sure you want to delete <b>{room.name}</b>?</p>
      </Alert>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomContent)
