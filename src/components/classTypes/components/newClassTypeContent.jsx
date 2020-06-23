import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import * as actions from 'actions/classTypes';

import {
  Button, ButtonGroup, Card, Divider, FormGroup,
  InputGroup, Intent, NonIdealState, Spinner,
  Tooltip, Position
} from '@blueprintjs/core'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  classType: state.classType.classType,
  redirect: state.classType.redirect,
  fetching: state.classType.fetching,
})

class NewClassTypeContent extends React.Component {
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
    this.props.actions.clearClassType()
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
    const editorState = classType.description
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(classType.description)))
      : EditorState.createEmpty()
    this.setState({ editorState })
  }

  createClassType = () => {
    const { classType, actions } = this.props
    this.setState({
      showNameValid: false,
      showDurationValid: false
    })
    actions.createClassType(classType)
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
    const { classType, redirect, actions, fetching } = this.props
    const { editorState, preview, showNameValid, showDurationValid } = this.state
    const { editClassType } = actions
    if(redirect){ return( <Redirect to={redirect} /> ) }
    const nameValid = classType.name && classType.name !== ''
    const durationValid = classType.duration && classType.duration !== ''
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>New Class</h2>
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
                  onChange={(e) => editClassType(e, 'name')}
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
                  onChange={(e) => editClassType(e, 'duration')}
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
                  readOnly={preview}
                  toolbar={toolbar}
                  toolbarHidden={preview}
                  onEditorStateChange={this.onEditorStateChange}
                />
              </Card>
            </div>
            <Button
              onClick={this.createClassType}
              disabled={!nameValid || !durationValid}
              intent={Intent.PRIMARY}
              text={'Submit'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewClassTypeContent)
