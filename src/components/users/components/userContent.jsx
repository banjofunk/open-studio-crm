import React from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from 'actions/users';
import { editUserPath } from 'utils/appPaths'
import { Alert, Button, Card, Divider,
  Intent, Spinner, Label, NonIdealState, Tag } from '@blueprintjs/core'
import { dig } from 'utils'

import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import '../users.scss'

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  user: state.user.user,
  fetched: state.user.fetched,
  fetching: state.user.fetching,
  redirect: state.user.redirect
})

class UserContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openDialog: false,
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
    const { actions, user, redirect } = this.props
    if(redirect) { actions.resetRedirect() }
    if(prevProps.user.id !== user.id) {
      this.setEditorState()
    }
  }

  setEditorState() {
    const { user } = this.props
    const editorState = user.description
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(user.description)))
      : EditorState.createEmpty()
    this.setState({ editorState })
  }

  showAlert = () => this.setState({ openDialog: true })
  cancelDelete = () => this.setState({ openDialog: false })
  confirmDelete = () => {
    const { actions, user } = this.props
    actions.deleteUser(user.id)
    this.setState({ openDialog: false })
  }

  render() {
    const { fetching, user, match, redirect } = this.props
    const { userId } = match.params
    const { editorState, openDialog } = this.state
    // const roles = user.roles.map(role =>
    //   <Tag key={role} minimal={true} intent={Intent.PRIMARY}>{role}</Tag>)
    if(redirect){ return( <Redirect to={redirect} /> ) }
    const admin = user.roles.includes('admin')
    const teacher = user.roles.includes('teacher')

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
              <Label className={'user-show-header'}>
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <div className={'header-buttons'}>
                  <Link to={editUserPath(userId)}>
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
            <Label className={'user-show-label'}>
              First Name:
              <span>{user.firstName}</span>
            </Label>
            <Label className={'user-show-label'}>
              Last Name:
              <span>{user.lastName}</span>
            </Label>
            <Label className={'user-show-label'}>
              Email:
              <span>{user.email}</span>
            </Label>
            <Label className={'user-show-label'}>
              Badge Number:
              <span>{user.badgeId}</span>
            </Label>
            <Label className={'user-show-label'}>
              Birthday:
              <span>{user.birthday}</span>
            </Label>
            <Label className={'user-show-label'}>
              Phone:
              <span>{user.phone}</span>
            </Label>
            <Label className={'user-show-label'}>
              Gender:
              <span>{user.gender}</span>
            </Label>
            <Label className={'user-show-label'}>
              Status:
              <span>{user.status}</span>
            </Label>
            <Label className={'user-show-label'}>
              Address:
              <span>{dig(user, 'address', 'address1')}</span>
            </Label>
            <Label className={'user-show-label'}>
              City:
              <span>{dig(user, 'address', 'city')}</span>
            </Label>
            <Label className={'user-show-label'}>
              State:
              <span>{dig(user, 'address', 'state')}</span>
            </Label>
            <Label className={'user-show-label'}>
              Zip:
              <span>{dig(user, 'address', 'zip')}</span>
            </Label>
            <Label className={'user-show-label'}>
              Roles:
              <div className={'show-roles'}>
                <Tag minimal={true} intent={Intent.PRIMARY}>Student</Tag>
                {teacher && <Tag minimal={true} intent={Intent.PRIMARY}>Teacher</Tag>}
                {admin && <Tag minimal={true} intent={Intent.PRIMARY}>Admin</Tag>}
              </div>
            </Label>
            {user.roles.includes('teacher') && <Label className={'user-show-label'}>
              Description:
              {!user.description && <span>No Description</span>}
            </Label>}
            {user.description &&
              <Card className={'user-description'}>
                <Editor
                  editorState={editorState}
                  readOnly={true}
                  toolbarHidden={true}
                />
              </Card>
            }
            <Alert
              cancelButtonText="Cancel"
              confirmButtonText="Delete User"
              icon="trash"
              intent={Intent.DANGER}
              isOpen={openDialog}
              onCancel={this.cancelDelete}
              onConfirm={this.confirmDelete}>
              <p>Are you sure you want to delete <br/> <b>{`${user.firstName} ${user.lastName}`}</b>?</p>
            </Alert>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContent)
