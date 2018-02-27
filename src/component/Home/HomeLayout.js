import React from 'react';
import { Header, Segment, Icon, Statistic } from 'semantic-ui-react';
import Typist from 'react-typist';

var imageStyle = { marginTop: 30 };
const ImageWithText = (props) => (
    <div className="ui container fluid">

        <Header
            as='h1'
            content='Welcome'
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
        />
        <Header
            as='h2'
            content='Designed to show the latest emergency calls in Baltimore'
            inverted
            style={{ fontSize: '1.9em', fontWeight: 'normal' }}
        />
        <Typist cursor={{ hideWhenDone: true, element: ' ' }}>
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#1fc231' }}>>Beautiful.</span>
            <Typist.Backspace count={10} delay={500} style={{ fontSize: '1.5em', fontWeight: 'bold' }} />
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#1fc231' }}>Fast.</span>
            <Typist.Backspace count={5} delay={500} />
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#1fc231' }}>Simple.</span>
        </Typist>
        <img className="ui large circular centered image" alt="Circular baltimore map" src={props.url} style={imageStyle} />
        <Header
            as='h3'
            content='Powered by Google Maps.'
            inverted
            style={{ fontSize: '1.0em', fontWeight: 'normal' }}
        />

    </div>
)

const HomeLayout = (props) => (

    <div>

        <Segment vertical inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }}>
            <ImageWithText url="/images/snazzy-image.png" />
        </Segment>

        <div className="ui container fluid">
            <Icon size='huge' name='lightning' style={{marginTop: 20}}/>
            <Header as='h2' textAlign='center'>
                    <Header.Content>
                        CALL STATS
                    </Header.Content>
                </Header>
            <div className="ui vertical segment">

                <Statistic.Group size='small' widths={2}>
                    <Statistic label='Today' value={props.totals.today}/>
                    <Statistic label='This Week' value={props.totals.week}/>
                    <Statistic label='This Month' value={props.totals.month}/>
                    <Statistic label='This Year' value={props.totals.year}/>
                </Statistic.Group>
            </div>
        </div>
    </div>

)

export default HomeLayout;