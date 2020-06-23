import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getClassType, deleteClassType, resetRedirect } from 'actions/classTypes';
import { editClassTypePath } from 'utils/appPaths'
import { Alert, Button, Card, Divider, Intent, Spinner, Label, NonIdealState } from '@blueprintjs/core'

import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const mapDispatchToProps = dispatch => ({
 deleteClassType: bindActionCreators(deleteClassType, dispatch),
 getClassType: bindActionCreators(getClassType, dispatch),
 resetRedirect: bindActionCreators(resetRedirect, dispatch),
})

const mapStateToProps = (state, ownProps) => ({
  classType: state.classType.classType,
  fetched: state.classType.fetched,
  fetching: state.classType.fetching,
  redirect: state.classType.redirect,
})

class ClassTypeContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openDialog: false,
      editorState: EditorState.createEmpty()
    }
  }

  componentDidMount(){
    const { getClassType, match, classType, fetched } = this.props
    const { classTypeId } = match.params
    const loaded = classType.id === parseInt(classTypeId)
    if(!fetched || !loaded) { getClassType(classTypeId) }
    this.setEditorState()
  }

  componentDidUpdate(prevProps){
    const { classType, redirect, resetRedirect } = this.props
    if(redirect) { resetRedirect() }
    if(prevProps.classType.id !== classType.id) {
      this.setEditorState()
    }
  }

  setEditorState() {
    const { classType } = this.props
    let editorState
    if(classType.description){
      if(classType.description.includes('{"blocks":')){
      } else {
        const blocksFromHTML = convertFromHTML(classType.description.replace(/\\n/g,""));
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        editorState = EditorState.createWithContent(contentState)
      }
    }else {
      editorState = EditorState.createEmpty()
    }
    this.setState({ editorState })
  }

  showAlert = () => this.setState({ openDialog: true })
  cancelDelete = () => this.setState({ openDialog: false })
  confirmDelete = () => {
    const { deleteClassType, classType } = this.props
    deleteClassType(classType.id)
    this.setState({ openDialog: false })
  }


  render() {
    const { classType, fetching, match, redirect } = this.props
    const { classTypeId } = match.params
    const { editorState, openDialog } = this.state
    if(redirect){ return( <Redirect to={redirect} /> ) }
    return(
      <div className="content">
        {fetching &&
              <NonIdealState
                children={<Spinner size={20} intent={Intent.PRIMARY} />}
                title="Loading" />
        }
        {!fetching &&
          <div>

            <div className={'content-header'}>

              <Label className={'class-type-show-header'}>
                <h2>{classType.name}</h2>
                <div className={'header-buttons'}>
                  <Link to={editClassTypePath(classTypeId)}>
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
            <Label className={'class-type-show-label'}>
              Name:
              <span>{classType.name}</span>
            </Label>
            <Label className={'class-type-show-label'}>
              Duration:
              <span>{`${classType.duration}min`}</span>
            </Label>
            <Label className={'class-type-show-label'}>
              Description:
              {!classType.description && <span>No Description</span>}
            </Label>
            {classType.description &&
              <Card className={'class-type-description'}>
                <Editor
                  editorState={editorState}
                  readOnly={true}
                  toolbarHidden={true}
                />
              </Card>
            }
            <Alert
              cancelButtonText="Cancel"
              confirmButtonText="Delete Class"
              icon="trash"
              intent={Intent.DANGER}
              isOpen={openDialog}
              onCancel={this.cancelDelete}
              onConfirm={this.confirmDelete}>
              <p>Are you sure you want to delete <b>{classType.name}</b>?</p>
            </Alert>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypeContent)
