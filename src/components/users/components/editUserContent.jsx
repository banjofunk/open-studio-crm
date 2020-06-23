import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import * as actions from 'actions/users';
import { userPath } from 'utils/appPaths'
import {
  Button, ButtonGroup, Card, Divider, FormGroup, InputGroup,
  Intent, NonIdealState, Spinner, Tag, Tooltip, Position
} from '@blueprintjs/core'

import { dig } from 'utils'

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  user: state.user.user,
  redirect: state.user.redirect,
  fetched: state.user.fetched,
  fetching: state.user.fetching,
})

class EditUserContent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showFirstNameValid: false,
      showLastNameValid: false,
      showEmailValid: false,
      preview: true,
      editorState: EditorState.createEmpty()
    }
  }

  componentDidMount(){
    const { actions, match, user, fetched } = this.props
    const { userId } = match.params
    const loaded = user.id === parseInt(userId)
    if(!fetched || !loaded) { actions.getUser(userId) }
    this.setEditorState()
  }

  componentDidUpdate(prevProps){
    const { user, redirect, actions } = this.props
    if(redirect) { actions.resetRedirect() }
    if(prevProps.user.id !== user.id) {
      this.setEditorState()
    }
  }

  editUserAddress = (value, name) => {
    const { address } = this.props.user
    address[name] = value
    this.props.actions.editUser(address, 'address')
  }

  setEditorState() {
    const { user } = this.props
    const editorState = user.description
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(user.description)))
      : EditorState.createEmpty()
    this.setState({ editorState })
  }

  updateUser = () => {
    const { user, actions } = this.props
    this.setState({ ...this.state,
      showFirstNameValid: false,
      showLastNameValid: false,
      showEmailValid: false,
    })
    actions.updateUser({ ...user })
  }

  onEditorStateChange = (editorState) => {
    const { editUserDescription } = this.props.actions
    const editorRaw = convertToRaw(editorState.getCurrentContent())
    const description = JSON.stringify(editorRaw)
    editUserDescription(description)
    this.setState({ editorState })
  }

  showEditor = () => this.setState({preview: false})
  showPreview = () => this.setState({preview: true})

  toggleRole = (role) => {
    const { editUser } = this.props.actions
    const { roles } = this.props.user
    const roleIdx = roles.findIndex(userRole => userRole.toLowerCase() === role.toLowerCase())
    if(roleIdx > -1){
      roles.splice(roleIdx, 1)
    }else{
      roles.push(role)
    }
    editUser(roles, 'roles')
  }

  render() {
    const { user, fetching, redirect, match, actions } = this.props
    const { userId } = match.params
    const { showEmailValid, showFirstNameValid, showLastNameValid, editorState, preview } = this.state
    if(redirect){return( <Redirect to={redirect} /> )}
    const firstNameValid = user.firstName && user.firstName !== ''
    const lastNameValid = user.lastName && user.lastName !== ''
    const emailValid = user.email && user.email !== ''
    const admin = user.roles.includes('admin')
    const teacher = user.roles.includes('teacher')
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>Edit User</h2>
          <Divider />
        </div>
        {fetching &&
          <NonIdealState
            children={<Spinner size={20} intent={Intent.PRIMARY} />}
            title="Loading" />
        }
        {!fetching &&
          <div>
            <div className={'user-form'}>

              <FormGroup
                label="Badge Number"
                labelFor="badgeId">
                <InputGroup
                  id="badgeId"
                  value={user.badgeId}
                  onChange={(e) => actions.editUser(e.target.value, 'badgeId')} />
              </FormGroup>
              <FormGroup
                helperText={!firstNameValid && showFirstNameValid ? 'first name is required' : ''}
                intent={!firstNameValid ? Intent.DANGER : Intent.PRIMARY}
                label="First Name"
                labelFor="firstName"
                labelInfo="(required)">
                <InputGroup
                  id="firstName"
                  value={user.firstName}
                  onBlur={() => this.setState({showFirstNameValid: true})}
                  onChange={(e) => actions.editUser(e.target.value, 'firstName')}
                  placeholder="First Name" />
              </FormGroup>
              <FormGroup
                helperText={!lastNameValid && showLastNameValid ? 'last name is required' : ''}
                intent={!lastNameValid ? Intent.DANGER : Intent.PRIMARY}
                label="Last Name"
                labelFor="lastName"
                labelInfo="(required)">
                <InputGroup
                  id="lastName"
                  value={user.lastName}
                  onBlur={() => this.setState({showLastNameValid: true})}
                  onChange={(e) => actions.editUser(e.target.value, 'lastName')}
                  placeholder="Last Name" />
              </FormGroup>
              <FormGroup
                helperText={!emailValid && showEmailValid ? 'email is required' : ''}
                intent={!emailValid ? Intent.DANGER : Intent.PRIMARY}
                label="Email"
                labelFor="email"
                labelInfo="(required)">
                <InputGroup
                  id="email"
                  value={user.email}
                  onBlur={() => this.setState({showEmailValid: true})}
                  onChange={(e) => actions.editUser(e.target.value, 'email')}
                  placeholder="Email" />
              </FormGroup>
              <FormGroup
                label="Phone"
                labelFor="phone">
                <InputGroup
                  id="phone"
                  value={dig(user,'phone') || ''}
                  onChange={(e) => actions.editUser(e.target.value, 'phone')} />
              </FormGroup>   
              <FormGroup
                label="Roles"
                labelFor="roles">
                <div id="roles">
                  <Tag
                    interactive={true}
                    onClick={() => this.toggleRole('admin')}
                    intent={admin ? Intent.SUCCESS : Intent.DEFAULT}
                    minimal={!admin}>Admin</Tag>
                  <Tag
                    interactive={true}
                    onClick={() => this.toggleRole('teacher')}
                    intent={teacher ? Intent.SUCCESS : Intent.DEFAULT}
                    minimal={!teacher}>Teacher</Tag>
                  <Tag
                    interactive={true}
                    minimal={!teacher}>Ambassador</Tag>
                  <Tag
                    interactive={true}
                    minimal={!teacher}>Assistant</Tag>
                  <Tag
                    interactive={true}
                    minimal={!teacher}>Therapist</Tag>
                </div>
              </FormGroup>
              <FormGroup
                label="Birthday"
                labelFor="birthday">
                <InputGroup
                  id="birthday"
                  value={user.birthday}
                  onChange={(e) => actions.editUser(e.target.value, 'birthday')} />
              </FormGroup>             
              <FormGroup
                label="Gender"
                labelFor="gender">
                <InputGroup
                  id="gender"
                  value={user.gender}
                  onChange={(e) => actions.editUser(e.target.value, 'gender')} />
              </FormGroup>                
              <FormGroup
                label="Status"
                labelFor="status">
                <InputGroup
                  id="status"
                  value={user.status}
                  onChange={(e) => actions.editUser(e.target.value, 'status')} />
              </FormGroup>                
              <FormGroup
                label="Address"
                labelFor="address">
                <InputGroup
                  id="address"
                  value={dig(user, 'address', 'address1') || ''}
                  onChange={(e) => this.editUserAddress(e.target.value, 'address1')} />
              </FormGroup>                
              <FormGroup
                label="City"
                labelFor="city">
                <InputGroup
                  id="city"
                  value={dig(user, 'address', 'city') || ''}
                  onChange={(e) => this.editUserAddress(e.target.value, 'city')} />
              </FormGroup>                
              <FormGroup
                label="State"
                labelFor="state">
                <InputGroup
                  id="state"
                  value={dig(user, 'address', 'state') || ''}
                  onChange={(e) => this.editUserAddress(e.target.value, 'state')} />
              </FormGroup>                
              <FormGroup
                label="Zip"
                labelFor="zip">
                <InputGroup
                  id="zip"
                  value={dig(user, 'address', 'zip') || ''}
                  onChange={(e) => this.editUserAddress(e.target.value, 'zip')} />
              </FormGroup>                
            </div>
            {user.roles.includes('teacher') && <div className={'user-editor'}>
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
            </div>}
            <Link to={userPath(userId)}>
              <Button
                onClick={actions.clearUser}
                intent={Intent.DEFAULT}
                text={'Cancel'} />
            </Link>
            <Button
              onClick={this.updateUser}
              disabled={!firstNameValid || !lastNameValid}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserContent)
