import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import * as actions from 'actions/locations'
import { locationPath } from 'utils/appPaths'
import { Button, Divider, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import '../locations.scss'

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  location: state.location.location,
  locationCreatedId: state.location.createdId,
  locationFetched: state.location.fetched,
})

class NewLocationContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showNameValid: false,
    }
  }

  componentDidMount(){
    this.props.actions.clearLocation()
  }

  createLocation = () => {
    const { actions, location } = this.props
    actions.createLocation(location)
  }

  render() {
    const { actions, locationCreatedId, location } = this.props
    const { showNameValid } = this.state
    if(locationCreatedId){return( <Redirect to={locationPath(locationCreatedId)} /> )}
    const nameValid = location.name && location.name !== ''
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>New Location</h2>
          <Divider />
        </div>
        <div className={'location-form'}>
          <FormGroup
            helperText={!nameValid && showNameValid ? 'name is required' : ''}
            intent={!nameValid ? Intent.DANGER : Intent.PRIMARY}
            label="Name"
            labelFor="name"
            labelInfo="(required)">
            <InputGroup
              id="name"
              value={location.name}
              onBlur={() => this.setState({showNameValid: true})}
              onChange={(e) => actions.editLocation(e, 'name')}
              placeholder="Location Name" />
          </FormGroup>
          <Button
            onClick={this.createLocation}
            intent={Intent.PRIMARY}
            disabled={!nameValid}
            icon="refresh"
            text={'Submit'} />
        </div>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLocationContent)
