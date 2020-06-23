import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import * as actions from 'actions/classTypes';
import { classTypePath } from 'utils/appPaths'
import {
  Button, ButtonGroup, Card, Divider, FormGroup, InputGroup,
  Intent, NonIdealState, Spinner, Tooltip, Position
} from '@blueprintjs/core'

import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  classType: state.classType.classType,
  redirect: state.classType.redirect,
  fetched: state.classType.fetched,
  fetching: state.classType.fetching,
})

class EditClassTypeContent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNameValid: false,
      showDurationValid: false,
      preview: false,
      editorState: EditorState.createEmpty()
    }
  }

  componentDidMount(){
    const { actions, match, classType, fetched } = this.props
    const { classTypeId } = match.params
    const loaded = classType.id === parseInt(classTypeId)
    if(!fetched || !loaded) { actions.getClassType(classTypeId) }
    this.setEditorState()
  }

  componentDidUpdate(prevProps){
    const { classType, redirect, actions } = this.props
    if(redirect) { actions.resetRedirect() }
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

  updateClassType = () => {
    const { classType, actions } = this.props
    this.setState({ ...this.state,
      showNameValid: false,
      showDurationValid: false
    })
    actions.updateClassType({ ...classType})
  }

  onEditorStateChange = (editorState) => {
    const { editClassTypeDescription } = this.props.actions
    const editorRaw = convertToRaw(editorState.getCurrentContent())
    const description = JSON.stringify(editorRaw)
    editClassTypeDescription(description)
    this.setState({ editorState })
  }

  showEditor = () => this.setState({preview: false})
  showPreview = () => this.setState({preview: true})

  render() {
    const { classType, fetching, redirect, match, actions } = this.props
    const { classTypeId } = match.params
    const { showNameValid, showDurationValid, editorState, preview } = this.state
    if(redirect){return( <Redirect to={redirect} /> )}
    const nameValid = classType.name && classType.name !== ''
    const durationValid = classType.duration && classType.duration !== ''
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>Edit Class</h2>
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
                  value={classType.name}
                  onBlur={() => this.setState({showNameValid: true})}
                  onChange={(e) => actions.editClassType(e, 'name')}
                  placeholder="Name" />
              </FormGroup>
              <FormGroup
                helperText={!durationValid && showDurationValid ? 'duration is required' : ''}
                intent={!durationValid ? Intent.DANGER : Intent.PRIMARY}
                label="Duration"
                labelFor="duration"
                labelInfo="(required)">
                <InputGroup
                  id="duration"
                  type="number"
                  value={classType.duration}
                  onBlur={() => this.setState({showDurationValid: true})}
                  onChange={(e) => actions.editClassType(e, 'duration')}
                  placeholder="Duration" />
              </FormGroup>
            </div>
            <div className={'class-type-editor'}>
              <FormGroup
                label="Description"
                inline={true}
                labelFor="description">
                <ButtonGroup minimal={true}>
                  <Tooltip content="Edit" position={Position.LEFT}>
                    <Button
                      active={!preview}
                      icon={'edit'}
                      small={true}
                      minimal={true}
                      intent={Intent.PRIMARY}
                      onClick={this.showEditor} />
                  </Tooltip>
                  <Tooltip content="Preview" position={Position.RIGHT}>
                    <Button
                      active={preview}
                      icon={'eye-open'}
                      small={true}
                      minimal={true}
                      intent={Intent.SUCCESS}
                      onClick={this.showPreview} />
                  </Tooltip>
                </ButtonGroup>
              </FormGroup>
              <Card>
                <Editor
                  editorState={editorState}
                  toolbar={toolbar}
                  readOnly={preview}
                  toolbarHidden={preview}
                  onEditorStateChange={this.onEditorStateChange}
                />
              </Card>
            </div>
            <Link to={classTypePath(classTypeId)}>
              <Button
                onClick={actions.clearClassType}
                intent={Intent.DEFAULT}
                text={'Cancel'} />
            </Link>
            <Button
              onClick={this.updateClassType}
              disabled={!nameValid || !durationValid}
              intent={Intent.PRIMARY}
              text={'Update'} />
          </div>
        }
      </div>
    )
  }
}

const toolbar = {
  options: ['inline', 'fontSize', 'fontFamily', 'textAlign', 'list', 'colorPicker', 'link', 'image', 'history'],
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { options: ['link'] },
  history: { inDropdown: true },
  inline: {
    inDropdown: true,
    options: ['bold', 'italic', 'underline', 'strikethrough'],
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClassTypeContent)
