import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { getRooms } from 'actions/rooms';
import { roomPath } from 'utils/appPaths'
import { Alignment, Button, ButtonGroup, Intent, Spinner } from '@blueprintjs/core'
import '../locations.scss'

const mapDispatchToProps = dispatch => ({
 getRooms: bindActionCreators(getRooms, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  locationId: state.rooms.locationId,
  rooms: state.rooms.rooms,
  fetching: state.rooms.fetching
})

class LocationSidebar extends React.Component {
  componentDidMount(){
    const { getRooms, match } = this.props
    const { locationId } = match.params
    if(this.props.locationId !== locationId) {
      getRooms(locationId)
    }
  }

  render() {
    const { match, fetching, rooms } = this.props
    const { locationId } = match.params
    if(fetching){return(<Spinner size={20} intent={Intent.PRIMARY} />)}

    const roomLinks = rooms.map((room, i) =>
      <Link key={i} to={roomPath(locationId, room.id)}>
        <Button
          alignText={Alignment.RIGHT}
          large={true}
          rightIcon={'chevron-right'}
          fill={true}
          text={room.name} />
      </Link>
    )
    return(
      <ButtonGroup className={'sidebar-group'} minimal={true} vertical={true}>
          {roomLinks}
          <Link to={roomPath(locationId, 'new')}>
            <Button
              alignText={Alignment.RIGHT}
              large={true}
              intent={Intent.SUCCESS}
              rightIcon={'plus'}
              fill={true}
              text={'New Room'} />
          </Link>
      </ButtonGroup>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSidebar)
