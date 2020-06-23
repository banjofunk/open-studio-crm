import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getLocations } from 'actions/locations';
import { Divider, NonIdealState } from '@blueprintjs/core'
import classnames from 'classnames'
import '../locations.scss'

const mapDispatchToProps = dispatch => ({
 getLocations: bindActionCreators(getLocations, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  locations: state.locations.locations,
  locationsFetched: state.locations.fetched
})

class LocationsContent extends React.Component {
  componentDidMount(){
    const { getLocations, locationsFetched } = this.props
    if(!locationsFetched){ getLocations() }
  }

  render() {
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>All Locations</h2>
          <Divider />
        </div>
        <div className={'non-ideal-container'}>
          <NonIdealState
            className={classnames('non-ideal')}
            icon={'office'}
            title="Select a Location" />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContent)
