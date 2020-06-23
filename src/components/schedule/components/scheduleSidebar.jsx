import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getLocations } from 'actions/locations';
import { getClassEvents } from 'actions/classEvents';
import { Alignment, Button, ButtonGroup, Divider, Classes } from '@blueprintjs/core'
import { DatePicker } from '@blueprintjs/datetime'
import moment from 'moment-timezone'

const mapDispatchToProps = dispatch => ({
  getLocations: bindActionCreators(getLocations, dispatch),
  getClassEvents: bindActionCreators(getClassEvents, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  locations: state.locations.locations,
  locationsFetched: state.locations.fetched
})

class ScheduleSidebar extends React.Component {
  componentDidMount(){
    const { getLocations, locationsFetched } = this.props
    if(!locationsFetched){ getLocations() }
  }

  dateSelected = (newDate) => {
    const date = moment(newDate).format('YYYY-MM-DD')
    this.props.getClassEvents(date)
    if(this.props.location.pathname !== '/schedule'){
      this.props.history.push('/schedule')
    }
  }

  render() {
    let sidebarLinks = [
        <Button
          key={'all-locations'}
          alignText={Alignment.RIGHT}
          large={true}
          rightIcon={'chevron-right'}
          fill={true}
          text={'All Locations'} />
    ]
    this.props.locations.forEach((location, i) => {
      sidebarLinks.push(<Divider key={`divider-${i}`} />)
      sidebarLinks.push(
        <Button
          key={`loc-${location.id}`}
          alignText={Alignment.RIGHT}
          large={true}
          rightIcon={'chevron-right'}
          fill={true}
          text={`${location.name} - All Rooms`} />
      )
      location.rooms.forEach(room => {
        sidebarLinks.push(
          <Button
            key={`room-${room.id}`}
            alignText={Alignment.RIGHT}
            large={true}
            rightIcon={'chevron-right'}
            fill={true}
            text={`${location.name} - ${room.name}`} />
        )
      })
    })
    return(
      <ButtonGroup className={'sidebar-group'} minimal={true} vertical={true}>
        <DatePicker 
          className={Classes.ELEVATION_1} 
          defaultValue={new Date()}
          onChange={(newDate) => this.dateSelected(newDate)} 
          canClearSelection={false}
        />
        {/* {sidebarLinks} */}
      </ButtonGroup>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSidebar)
