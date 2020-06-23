import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import * as actions from 'actions/locations';
import { locationPath } from 'utils/appPaths'
import {
  Button, Divider, FormGroup, InputGroup,
  Intent, NonIdealState, Spinner
} from '@blueprintjs/core'

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  location: state.location.location,
  redirect: state.location.redirect,
  fetched: state.location.fetched,
  fetching: state.location.fetching,
})

class EditLocationContent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNameValid: false
    }
  }

  componentDidMount(){
    const { actions, match, location, fetched } = this.props
    const { locationId } = match.params
    const loaded = location.id === parseInt(locationId)
    if(!fetched || !loaded) { actions.getLocation(locationId) }
  }

  componentDidUpdate(prevProps){
    const { redirect, actions } = this.props
    if(redirect) { actions.resetRedirect() }
  }

  updateLocation = () => {
    const { location, actions } = this.props
    this.setState({ ...this.state,
      showNameValid: false
    })
    actions.updateLocation({ ...location})
  }

  render() {
    const { location, fetching, redirect, match, actions } = this.props
    const { locationId } = match.params
    const { showNameValid } = this.state
    if(redirect){return( <Redirect to={redirect} /> )}
    const nameValid = location.name && location.name !== ''
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>Edit Location</h2>
          <Divider />
        </div>
        {fetching &&
          <NonIdealState
            children={<Spinner size={20} intent={Intent.PRIMARY} />}
            title="Loading" />
        }
        {!fetching &&
          <div>
            <div className={'class-type-form'}>
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
                  placeholder="Name" />
              </FormGroup>
            </div>
            <Link to={locationPath(locationId)}>
              <Button
                onClick={actions.clearLocation}
                intent={Intent.DEFAULT}
                text={'Cancel'} />
            </Link>
            <Button
              onClick={this.updateLocation}
              disabled={!nameValid}
              intent={Intent.PRIMARY}
              text={'Update'} />
          </div>
        }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditLocationContent)
