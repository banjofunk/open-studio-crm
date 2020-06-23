import React from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from 'actions/products';
import { editProductPath } from 'utils/appPaths'
import { Alert, Button, Card, Divider,
  Intent, Spinner, Label, NonIdealState } from '@blueprintjs/core'

import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import '../products.scss'

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  product: state.product.product,
  fetched: state.product.fetched,
  fetching: state.product.fetching,
  redirect: state.product.redirect
})

class ProductContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openDialog: false,
      editorState: EditorState.createEmpty()
    }
  }

  componentDidMount(){
    const { actions, match, product, fetched } = this.props
    const { productId } = match.params
    const loaded = product.id === parseInt(productId)
    if(!fetched || !loaded) { actions.getProduct(productId) }
    this.setEditorState()
  }

  componentDidUpdate(prevProps){
    const { actions, product, redirect } = this.props
    if(redirect) { actions.resetRedirect() }
    if(prevProps.product.id !== product.id) {
      this.setEditorState()
    }
  }

  setEditorState() {
    const { product } = this.props
    const editorState = product.description
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(product.description)))
      : EditorState.createEmpty()
    this.setState({ editorState })
  }

  showAlert = () => this.setState({ openDialog: true })
  cancelDelete = () => this.setState({ openDialog: false })
  confirmDelete = () => {
    const { actions, product } = this.props
    actions.deleteProduct(product.id)
    this.setState({ openDialog: false })
  }

  render() {
    const { fetching, product, match, redirect } = this.props
    const { productId } = match.params
    const { editorState, openDialog } = this.state
    // const roles = product.roles.map(role =>
    //   <Tag key={role} minimal={true} intent={Intent.PRIMARY}>{role}</Tag>)
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
              <Label className={'product-show-header'}>
                <span style={{fontSize: '18px' }}>{product.name}</span>
                <span style={{fontSize: '12px' }}>{product.supplierName}</span>
                <div className={'header-buttons'}>
                  <Link to={editProductPath(productId)}>
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
            <Label className={'product-show-label'}>
              Supplier:
              <span>{product.supplierName}</span>
            </Label>
            <Label className={'product-show-label'}>
              Name:
              <span>{product.name}</span>
            </Label>
            <Label className={'product-show-label'}>
              Barcode:
              <span>{product.barcode}</span>
            </Label>
            <Label className={'product-show-label'}>
              Price:
              <span>{product.price}</span>
            </Label>
            {product.description &&
              <Card className={'product-description'}>
                <Editor
                  editorState={editorState}
                  readOnly={true}
                  toolbarHidden={true}
                />
              </Card>
            }
            <Alert
              cancelButtonText="Cancel"
              confirmButtonText="Delete Product"
              icon="trash"
              intent={Intent.DANGER}
              isOpen={openDialog}
              onCancel={this.cancelDelete}
              onConfirm={this.confirmDelete}>
              <p>Are you sure you want to delete <br/> <b>{`${product.firstName} ${product.lastName}`}</b>?</p>
            </Alert>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContent)
