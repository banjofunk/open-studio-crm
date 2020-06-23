import React from 'react'
import { ButtonGroup, Divider } from '@blueprintjs/core'
import './layout.scss'

const SidebarMenu = ({ items, show }) =>
        <ButtonGroup className={'sidebar-group'} minimal={true} vertical={true}>
            <Divider />
            {items}
        </ButtonGroup>
export default SidebarMenu
