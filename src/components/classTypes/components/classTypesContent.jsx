import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getClassTypes } from 'actions/classTypes';
import { Divider, NonIdealState } from '@blueprintjs/core'
import classnames from 'classnames'

const mapDispatchToProps = dispatch => ({
 getClassTypes: bindActionCreators(getClassTypes, dispatch),
})

const mapStateToProps = (state, ownProps) => ({
  classTypes: state.classTypes.classTypes,
  fetched: state.classTypes.fetched
})

class ClassTypesContent extends React.Component {
  componentDidMount(){
    const { getClassTypes, fetched } = this.props
    if(!fetched){ getClassTypes() }
  }

  render() {
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>All Classes</h2>
          <Divider />
        </div>
        <div className={'non-ideal-container'}>
          <NonIdealState
            className={classnames('non-ideal')}
            icon={'clipboard'}
            title="Select a Class" />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypesContent)
