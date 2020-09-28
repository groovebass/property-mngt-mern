import React, { useState } from 'react';
import {Button, Drawer, Menu} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import RightMenu from './RightMenu';




function NavBar() {
    const [visible, setvisible] = useState(false)

    const showDrawer = () =>{
        setvisible(true)
    };
    const onClose = () => {
        setvisible(false)
    };
    return (
        <nav className='menu'>
        <div className='lgscrnmenu'> 
        <div className='logo'>
            <a href='/'> 
            <img className='log-img' src='/images/log.png' alt='Demawo Proper' />
            </a>
        </div> 

            <Menu mode='horizontal'>
                <Menu.Item key='home'> <a href='/'> Home</a> </Menu.Item>
                
                <Menu.Item key='properties'> <a href='/properties'>Properties</a> </Menu.Item>
                   
                <Menu.Item key='about'>  <a href='/about'> About</a> </Menu.Item>

                <Menu.Item key='contact'> <a href='/contact'> Contact</a> </Menu.Item>
                <div className="menu_right">
                <RightMenu mode="horizontal"/>
            </div>
            </Menu>
            </div>
            
            <Button
            className='mobile-button'
            type='link'
            onClick={showDrawer}
            >
            
                <FontAwesomeIcon icon={faEllipsisV} type="align-right" style={{fontSize:'3rem', color: '#1890ff'}}/>
            </Button>
            <Drawer
            title="Demawo Properties"
            placement="right"
             className="menu_drawer"
             closable={false}
            onClose={onClose}
             visible={visible} 
            >
                  <Menu >
                <Menu.Item key='home'><a href='/'> Home</a> </Menu.Item>
                <Menu.Item key='properties'> <a href='/properties'>Properties</a> </Menu.Item>
                <Menu.Item key='about'><a href='/about'> About</a></Menu.Item>
                
            </Menu>
            <RightMenu mode="inline"/>
            <img className='log-img' src='/images/log.png' alt='Demawo Prop' />
            </Drawer>
        </nav>
    )
}

export default NavBar
