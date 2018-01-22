import React, { Component } from 'react';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Link from 'react-router-dom/Link';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

class AppHeader extends Component {

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state

        return (
            <Segment size='mini' inverted vertical textAlign='center'>
                <Container>
                    <Menu inverted secondary size='large'>
                        <Menu.Item
                            active={activeItem === 'home'}
                            name='home'
                            inverted={'true'}
                            color='green'
                            as='span'
                            onClick={this.handleItemClick}>
                            <Link to='/'>Home</Link>
                        </Menu.Item>
                        <Menu.Item
                            active={activeItem === 'about'}
                            name='about'
                            inverted={'true'}
                            color='green'
                            as='span'
                            onClick={this.handleItemClick}>
                            <Link to='/about'>About</Link>
                        </Menu.Item>
                        <Menu.Item
                            position='right'>
                            <Link to='/dashboard'>
                                <Button name='dashboard' onClick={this.handleItemClick} active={activeItem === 'dashboard'} inverted color='green'>Dashboard</Button>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Container>
            </Segment>
        );
    }
}

export default AppHeader;