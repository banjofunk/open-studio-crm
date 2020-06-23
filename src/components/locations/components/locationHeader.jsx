import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { getLocation } from 'actions/locations';
import { locationsPath } from 'utils/appPaths'
import { Classes, Icon } from '@blueprintjs/core'
import classnames from 'classnames'
import '../locations.scss'

const mapDispatchToProps = dispatch => ({
 getLocation: bindActionCreators(getLocation, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  orgLocation: state.location.location,
  locationFetched: state.location.fetched,
})

class LocationHeader extends React.Component {
  componentDidMount(){
    const { getLocation, match, orgLocation, locationFetched } = this.props
    const { locationId } = match.params
    if(!locationFetched && orgLocation.id !== locationId) { getLocation(locationId) }
  }

  render() {
    const { orgLocation } = this.props
    return(
        <Link to={locationsPath()}>
            <h2 className={classnames(Classes.TEXT_MUTED, 'sidebar-header')}><Icon icon='chevron-left'/> {orgLocation.name} Rooms</h2>
        </Link>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHeader)
