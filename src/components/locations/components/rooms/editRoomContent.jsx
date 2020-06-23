import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { getLocation } from 'actions/locations';
import * as actions from 'actions/rooms';
import { roomPath } from 'utils/appPaths'
import {
  Button, Divider, FormGroup, InputGroup,
  Intent, NonIdealState, Spinner
} from '@blueprintjs/core'

const mapDispatchToProps = dispatch => ({
 getLocation: bindActionCreators(getLocation, dispatch),
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  location: state.location.location,
  room: state.room.room,
  redirect: state.room.redirect,
  fetched: state.room.fetched,
  fetching: state.room.fetching,
})

class EditRoomContent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNameValid: false
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
    const { redirect, actions } = this.props
    if(redirect) { actions.resetRedirect() }
  }

  updateRoom = () => {
    const { room, actions } = this.props
    this.setState({ ...this.state,
      showNameValid: false
    })
    actions.updateRoom({ ...room})
  }

  render() {
    const { room, fetching, redirect, match, actions } = this.props
    const { locationId, roomId } = match.params
    const { showNameValid } = this.state
    if(redirect){return( <Redirect to={redirect} /> )}
    const nameValid = room.name && room.name !== ''
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>Edit Room</h2>
          <Divider />
        </div>
        {fetching &&
          <NonIdealState
            children={<Spinner size={20} intent={Intent.PRIMARY} />}
            title="Loading" />
        }
        {!fetching &&
          <div>
            <div className={'room-form'}>
              <FormGroup
                helperText={!nameValid && showNameValid ? 'name is required' : ''}
                intent={!nameValid ? Intent.DANGER : Intent.PRIMARY}
                label="Name"
                labelFor="name"
                labelInfo="(required)">
                <InputGroup
                  id="name"
                  value={room.name}
                  onBlur={() => this.setState({showNameValid: true})}
                  onChange={(e) => actions.editRoom(e, 'name')}
                  placeholder="Name" />
              </FormGroup>
            </div>
            <Link to={roomPath(locationId, roomId)}>
              <Button
                onClick={actions.clearRoom}
                intent={Intent.DEFAULT}
                text={'Cancel'} />
            </Link>
            <Button
              onClick={this.updateRoom}
              disabled={!nameValid}
              intent={Intent.PRIMARY}
              text={'Update'} />
          </div>
        }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditRoomContent)
