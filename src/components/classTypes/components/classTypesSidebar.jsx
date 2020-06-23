import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { getClassTypes } from 'actions/classTypes';
import { classTypePath } from 'utils/appPaths'
import { Alignment, Button, ButtonGroup, InputGroup, Intent, Spinner } from '@blueprintjs/core'

const mapDispatchToProps = dispatch => ({
 getClassTypes: bindActionCreators(getClassTypes, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  classTypes: state.classTypes.classTypes,
  fetched: state.classTypes.fetched,
  fetching: state.classTypes.fetching,
})

class ClassTypesSidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filterValue: ''
    }
  }

  componentDidMount(){
    const { getClassTypes, fetched } = this.props
    if(!fetched){ getClassTypes() }
  }

  searchFilterChange = (event) => {
    const filterValue = event.target.value
    this.setState({ filterValue })
  }

  render() {
    const { classTypes, fetching } = this.props
    const { filterValue } = this.state
    if(fetching){return(<Spinner size={20} intent={Intent.PRIMARY} />)}

    const filteredClassTypes = classTypes.filter( cType =>
      cType.name.toLowerCase().includes(filterValue.toLowerCase())
    )

    const classTypeLinks = filteredClassTypes.map((classType, i) =>
      <Link key={i} to={classTypePath(classType.id)}>
        <Button
          alignText={Alignment.RIGHT}
          large={true}
          rightIcon={'chevron-right'}
          fill={true}
          text={`${classType.name}`} />
      </Link>
    )
    return(
      <ButtonGroup className={'sidebar-group'} minimal={true} vertical={true}>
      <InputGroup
        className={'bp3-round sidebar-filter'}
        leftIcon="search"
        onChange={this.searchFilterChange}
        placeholder="Search Classes..."
        value={filterValue}
      />

        {classTypeLinks}
        <Link to={'/classes/new'}>
          <Button
            alignText={Alignment.RIGHT}
            large={true}
            intent={Intent.SUCCESS}
            rightIcon={'plus'}
            fill={true}
            text={'New Class'} />
          </Link>
      </ButtonGroup>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypesSidebar)
