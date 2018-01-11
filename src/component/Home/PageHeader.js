import React, { Component } from 'react';
import {
    Container,
    Header,
    Segment,
    Menu,
    Button
} from 'semantic-ui-react';
import Typist from 'react-typist';
import { Router, Link } from 'react-router-dom';

var imageStyle = { marginTop: 30 };
const ImageWithText = (props) => (
    <Container ui fluid>
        <Header
            as='h1'
            content='Welcome'
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
        />
        <Header
            as='h2'
            content='Designed to show the latest emergency calls in baltimore'
            inverted
            style={{ fontSize: '1.9em', fontWeight: 'normal' }}
        />
        <Typist cursor={{ hideWhenDone: true, element: ' ' }}>
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#5efc82' }}>>Beautiful.</span>
            <Typist.Backspace count={10} delay={500} style={{ fontSize: '1.5em', fontWeight: 'bold' }} />
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#5efc82' }}>Fast.</span>
            <Typist.Backspace count={5} delay={500} />
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#5efc82' }}>Simple.</span>
        </Typist>
        <img class="ui large circular centered image" alt="Circular baltimore map" src={props.url} style={imageStyle} />
        <Header
            as='h3'
            content='Powered by Google Maps.'
            inverted
            style={{ fontSize: '1.0em', fontWeight: 'normal' }}
        />

    </Container>
)

class PageHeader extends Component {
    render() {
        return (
            <Segment vertical inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }}>
                <Container>
                    <Menu inverted pointing secondary size='large'>
                        <Menu.Item as='a' active><Link to='/'>Home</Link></Menu.Item>
                        <Menu.Item as='a'><Link to='/about'>About</Link></Menu.Item>
                        <Menu.Item position='right'>
                            <Link to='/login'>
                                <Button as='a' inverted>Login</Button>
                            </Link>
                            <Link to='/register'>
                                <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Register</Button>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Container>
                <ImageWithText url="/images/snazzy-image.png" />
            </Segment>
        );
    }
}

export default PageHeader;