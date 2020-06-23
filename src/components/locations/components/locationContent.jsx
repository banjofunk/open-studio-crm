import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom'
import * as actions from 'actions/locations';
import { editLocationPath } from 'utils/appPaths'
import { Alert, Button, Divider, Label, NonIdealState, Spinner, Intent } from '@blueprintjs/core'
import '../locations.scss'

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  location: state.location.location,
  fetching: state.location.fetching,
  fetched: state.location.fetched,
  redirect: state.location.redirect,
})

class LocationContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openDialog: false
    }
  }
  componentDidMount(){
    const { actions, match, location, fetched } = this.props
    const { locationId } = match.params
    const loaded = location.id === parseInt(locationId)
    if(!fetched || !loaded) { actions.getLocation(locationId) }
  }

  componentDidUpdate(prevProps){
    const { actions, redirect } = this.props
    if(redirect) { actions.resetRedirect() }
  }

  showAlert = () => this.setState({ openDialog: true })
  cancelDelete = () => this.setState({ openDialog: false })
  confirmDelete = () => {
    const { actions, location } = this.props
    actions.deleteLocation(location.id)
    this.setState({ openDialog: false })
  }

  render() {
    const { location, fetching, match, redirect } = this.props
    const { openDialog } = this.state
    const { locationId } = match.params
    const { address } = location
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
                <h2>{location.name}</h2>
                <div className={'header-buttons'}>
                  <Link to={editLocationPath(locationId)}>
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
          {address &&
            <div>
              <span>{`${address.address1}`}</span>
              <span>{address.address2 && `, ${address.address2}`}</span>
              <span style={{display: 'block'}}>{`${address.city}, ${address.state} ${address.zip}`}</span>
            </div>
          }
        </div>
      }
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Delete Class"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={openDialog}
        onCancel={this.cancelDelete}
        onConfirm={this.confirmDelete}>
        <p>Are you sure you want to delete <b>{location.name}</b>?</p>
      </Alert>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContent)
