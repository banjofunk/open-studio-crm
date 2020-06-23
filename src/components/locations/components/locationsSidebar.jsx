import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { getLocations } from 'actions/locations';
import { locationPath } from 'utils/appPaths'
import { Alignment, Button, ButtonGroup, Intent, Spinner } from '@blueprintjs/core'
import '../locations.scss'

const mapDispatchToProps = dispatch => ({
 getLocations: bindActionCreators(getLocations, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  locations: state.locations.locations,
  fetching: state.locations.fetching,
  locationsFetched: state.locations.fetched
})

class LocationsSidebar extends React.Component {
  componentDidMount(){
    const { getLocations, locationsFetched } = this.props
    if(!locationsFetched){ getLocations() }
  }

  render() {
    const { fetching } = this.props
    if(fetching){return(<Spinner size={20} intent={Intent.PRIMARY} />)}

    const locations = this.props.locations.map((location, i) =>
      <Link key={i} to={locationPath(location.id)}>
        <Button
          alignText={Alignment.RIGHT}
          large={true}
          rightIcon={'chevron-right'}
          fill={true}
          text={location.name} />
      </Link>
    )
    return(
      <ButtonGroup className={'sidebar-group'} minimal={true} vertical={true}>
        {locations}
        <Link to={locationPath('new')}>
          <Button
            alignText={Alignment.RIGHT}
            large={true}
            intent={Intent.SUCCESS}
            rightIcon={'plus'}
            fill={true}
            text={'New Location'} />
          </Link>
      </ButtonGroup>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSidebar)
