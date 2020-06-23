import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import * as actions from 'actions/rooms'
import { Button, Divider, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import '../../locations.scss'

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  room: state.room.room,
  redirect: state.room.redirect,
})

class NewRoomContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showNameValid: false,
    }
  }

  componentDidMount(){
    this.props.actions.clearRoom()
  }

  componentDidUpdate(prevProps){
    const { redirect, actions } = this.props
    if(redirect) { actions.resetRedirect() }
  }

  createRoom = () => {
    const { room, match } = this.props
    const { locationId } = match.params
    this.props.actions.createRoom({...room, locationId})
  }

  render() {
    const { actions, redirect, room } = this.props
    const { showNameValid } = this.state
    if(redirect){ return( <Redirect to={redirect} /> ) }
    const nameValid = room.name && room.name !== ''
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>New Room</h2>
          <Divider />
        </div>
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
              placeholder="Room Name" />
          </FormGroup>
          <Button
            onClick={this.createRoom}
            intent={Intent.PRIMARY}
            disabled={!nameValid}
            icon="refresh"
            text={'Submit'} />
        </div>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoomContent)
