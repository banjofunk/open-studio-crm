import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import {
  Alignment, Button, Classes, Icon, Menu, MenuItem, MenuDivider,
  Navbar, NavbarGroup, NavbarDivider, NavbarHeading, Popover, Position, Tooltip
} from '@blueprintjs/core'
import classnames from 'classnames'
import './layout.scss'

class AppNavbar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: null
    }
  }

  componentDidMount(){
    Auth.currentAuthenticatedUser().then(data => {
      const { name, family_name } = data.attributes
      const username = `${name} ${family_name}`
      this.setState({ username })
    })
  }


  signOut = () => Auth.signOut().then(() => window.location.reload())
  render(){
    const { username } = this.state
    const exampleMenu = (
    <Menu>
        <li className="bp3-menu-header"><h6 className="bp3-heading">{username}</h6></li>
        <MenuDivider />
        <MenuItem icon="cog" text="Settings" />
        <MenuItem icon="user" text="Sign Out" onClick={this.signOut} />
    </Menu>
);
    return(
      <Navbar className={classnames(Classes.DARK, 'navbar')} fixedToTop={true}>
        <div className={'nav-wrapper'}>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading className={'navbar-heading'}>My Studio</NavbarHeading>
            <NavbarDivider />
          </NavbarGroup>
          <NavbarGroup align={Alignment.LEFT}>
            <Link to={'/locations'}>
              <Button className={Classes.MINIMAL} icon="office" text="Locations" />
            </Link>
            <Link to={'/users'}>
              <Button className={Classes.MINIMAL} icon="people" text="Users" />
            </Link>
            <Link to={'/classes'}>
              <Button className={Classes.MINIMAL} icon="clipboard" text="Classes" />
            </Link>
            <Link to={'/schedule'}>
              <Button className={Classes.MINIMAL} icon="calendar" text="Schedule" />
            </Link>
            <Link to={'/products'}>
              <Button className={Classes.MINIMAL} icon="shopping-cart" text="Products" />
            </Link>
            <Link to={'/users'}>
              <Button className={Classes.MINIMAL} icon="chart" text="Reports" />
            </Link>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
              <Link to={'/'}>
                <Tooltip content="Notifications" position={Position.BOTTOM}>
                  <Button className={Classes.MINIMAL}>
                    <Icon icon="notifications" iconSize={18} />
                  </Button>
                </Tooltip>
              </Link>
              <Link to={'/'}>
                <Tooltip content="Settings" position={Position.BOTTOM}>
                  <Button className={Classes.MINIMAL}>
                    <Icon icon="cog" iconSize={18} />
                  </Button>
                </Tooltip>
              </Link>

              <Popover content={exampleMenu} position={Position.BOTTOM}>
                <Button className={Classes.MINIMAL}>
                  <Icon icon={'user'} iconSize={18} />
                  <Icon icon={'chevron-down'} iconSize={18} />
                </Button>
              </Popover>
          </NavbarGroup>
        </div>
      </Navbar>
    )
  }
}
 export default AppNavbar
