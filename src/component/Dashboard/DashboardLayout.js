import React, { Component } from 'react';
import { Sidebar, Segment, Button, Table, Checkbox, Form, Header, Divider, Dimmer, Loader, Grid } from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, FaAnchor } from 'react-google-maps'
import Marker from 'react-google-maps/lib/components/Marker'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { DateRange } from 'react-date-range'
import request from 'superagent'
//import superdebug from 'superagent-debugger'
import AppStatics from '../../helpers/AppStatics'
import Momentjs from 'moment'

const BALTIMORE_LAT = 39.299236
const BALTIMORE_LONG = -76.609383

function generateMarkers(jsonObjectArray) {
    var markers = []
    for (var i = 0; i < jsonObjectArray.length; i++) {
        var call_record = jsonObjectArray[i]
        if (!(typeof call_record === 'undefined') || !(typeof call_record.bpd_call_id === 'undefined')) {
            var marker = <Marker
                            key={call_record.bpd_call_id}
                            position={{ lat: call_record.latitude, lng: call_record.longitude }}>
                                {/* <InfoWindow>
                                    <div>
                                        <p><strong>ID: </strong>{call_record.bpd_call_id}</p>
                                        <p><strong>Time: </strong>{call_record.call_time}</p>
                                        <p><strong>Priority: </strong>{call_record.priority}</p>
                                        <p><strong>District: </strong>{call_record.district}</p>
                                        <p><strong>Description: </strong>{call_record.description}</p>
                                        <p><strong>Address: </strong>{call_record.address}</p>
                                    </div>
                                </InfoWindow> */}
                            </Marker>
            markers.push(marker)
        }
    }
    return markers
}

function generateTableRows(jsonObjectArray) {
    var rows = []
    for (var i = 0; i < jsonObjectArray.length; i++) {
        var call_record = jsonObjectArray[i];
        if (!(typeof call_record === 'undefined') || !(typeof call_record.bpd_call_id === 'undefined')) {
            var row =
                (<Table.Row key={'table_row_' + call_record.bpd_call_id}>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_bpd_call_id'}>{call_record.bpd_call_id}</Table.Cell>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_time'}>{call_record.call_time}</Table.Cell>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_priority'}>{call_record.priority}</Table.Cell>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_district'}>{call_record.district}</Table.Cell>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_desc'}>{call_record.description}</Table.Cell>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_addr'}>{call_record.address}</Table.Cell>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_lat'}>{call_record.latitude}</Table.Cell>
                    <Table.Cell key={'table_cell_' + call_record.bpd_call_id + '_long'}>{call_record.longitude}</Table.Cell>
                </Table.Row>);
            rows.push(row)
        }
    }
    return rows;
}

function generateTableHeader(array) {
    var header_cells = []
    for (var i = 0; i < array.length; i++) {
        var header_cell = (<Table.HeaderCell key={'table_header_cell_' + array[i]}>{array[i]}</Table.HeaderCell>)
        header_cells.push(header_cell)
    }
    var header = (
        <Table.Header>
            <Table.Row>
                {header_cells}
            </Table.Row>
        </Table.Header>
    );
    return header
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultOptions = {{ styles: AppStatics.MAP_STYLE}}
        defaultZoom={10}
        defaultCenter={{ lat: BALTIMORE_LAT, lng: BALTIMORE_LONG }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {generateMarkers(props.call_records)}
        </MarkerClusterer>

    </GoogleMap>
))

const tableHeaders = [
    // 'Show in map',
    'BPD Call Id',
    'Call Time',
    'Priority',
    'District',
    'Description',
    'Address',
    'Latitude',
    'Longitude'
];

class DashboardLayout extends Component {

    formStartDate = ''
    formEndDate = ''
    formPriorities = []
    formDistricts = []

    constructor(props) {
        super(props);
        this.state = {
            visibleSidebar: false,
            call_records: [],
            isMarkerShown: false,
            showLoaders: false,
            activeTimelineButton: 'today',
            showModal: false,
            marker_modal_data: {}
        }
    }

    componentDidMount() {
        this.fetchCallRecordsByDayAgo(0)
    }

    fetchCallRecordsByDayAgo(day) {
        var instance = this
        instance.setState({ showLoaders: true, call_records: []})
        request
            .post(AppStatics.API_BASE_URL + '/records/search')
            .send({
                'start_date': Momentjs().add(day, 'days').toString(),
                'end_date': Momentjs().add(day, 'days').toString()
            })
            //.use(superdebug(console.info))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(function(response) {
                //console.log(response.body.data)
                if (response.ok)
                    instance.setState({ call_records: response.body.data, showLoaders: false })
                else if (response.body.message) {
                    console.error(response.body.message)
                    instance.setState({ showLoaders: false })
                } else {
                    console.error('Request failed. Unknown error.')
                    instance.setState({ showLoaders: false })
                }
            })
            .catch(function(error) {
                instance.setState({ showLoaders: false })
                console.log(error)
            });
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        console.log(error)
    }

    handlePriorityChange = (event, data) => {
        if (data.checked) {
            this.formPriorities.push(data.value)
        } else {
            const index = this.formPriorities.indexOf(data.value)
            if (index !== -1) {
                this.formPriorities.splice(index, 1)
            }
        }
        console.log(this.formPriorities)
    }

    handleDistrictChange = (event, data) => {
        if (data.checked) {
            this.formDistricts.push(data.value)
        } else {
            const index = this.formDistricts.indexOf(data.value)
            if (index !== -1) {
                this.formDistricts.splice(index, 1)
            }
        }
        console.log(this.formDistricts)
    }

    handleFilterFormSubmit = () => {
        var instance = this
        instance.setState({ showLoaders: true, call_records: []})
        request
            .post(AppStatics.API_BASE_URL + '/records/search')
            .send({

                'start_date': this.formStartDate,
                'end_date': this.formEndDate,
                'priorities': this.formPriorities,
                'districts': this.formDistricts
            })
            //.use(superdebug(console.info))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(function(response) {
                //console.log(response.body.data)

                if (response.ok)
                    instance.setState({ call_records: response.body.data, showLoaders: false, visibleSidebar: false, activeTimelineButton: 'none' })
                else if (response.body.message){
                    console.error(response.body.message)
                    instance.setState({ showLoaders: false })
                } else {
                    console.error('Request failed. Unknown error.')
                    instance.setState({ showLoaders: false })
                }
            })
            .catch(function(error) {
                instance.setState({ showLoaders: false, visibleSidebar:false })
                console.log(error)
            });
    }

    handleDateRangeSelect(range) {
        //console.log(range);
        // An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
        this.formStartDate = range.startDate.format('YYYY-MM-DD')
        this.formEndDate = range.endDate.format('YYYY-MM-DD')
    }

    handleTimelineButtonClick = (e, { name }) => {
        this.setState({ activeTimelineButton: name })
        switch (name){
            case 'today': this.fetchCallRecordsByDayAgo(0); break;
            case 'yesterday': this.fetchCallRecordsByDayAgo(-1); break;
            case '7days': this.fetchCallRecordsByDayAgo(-7); break;
            case '30days': this.fetchCallRecordsByDayAgo(-30); break;
            default: { console.log() }
        }
    }


    toggleSidebarVisibility() {
        this.setState({ visibleSidebar: !this.state.visibleSidebar })
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar animation='uncover' width='wide' visible={this.state.visibleSidebar} vertical='true'>
                        <Form style={{ margin: 10 }} onSubmit={this.handleFilterFormSubmit.bind(this)}>
                            <Header as='h4'>Filters</Header>
                            <Divider horizontal>Date Range</Divider>
                            <DateRange
                                theme={{DaySelected    : {
                                    background   : '#21BA45'
                                  }}}
                                onInit={this.handleDateRangeSelect.bind(this)}
                                onChange={this.handleDateRangeSelect.bind(this)}
                            />
                            <Divider horizontal>Priority</Divider>
                            {AppStatics.PRIORITIES.map((name, index) =>
                                <Form.Field key={'priority_field_' + index}>
                                    <Checkbox
                                        key={'priority_checkbox_' + index}
                                        label={name[index].name}
                                        value={name[index].value}
                                        onChange={this.handlePriorityChange}
                                    />
                                </Form.Field>
                            )}
                            <Divider horizontal>District</Divider>
                            {AppStatics.DISTRICTS.map((districts, index) =>
                                <Form.Field key={'district_field_' + index}>
                                    <Checkbox
                                        key={'district_checkbox_' + index}
                                        label={districts[index].name}
                                        value={districts[index].value}
                                        onChange={this.handleDistrictChange}
                                    />
                                </Form.Field>
                            )}
                            <Form.Button color='green' >Submit</Form.Button>
                        </Form>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Grid stackable doubling inverted padded>
                            <Grid.Row color='black'>
                                <Grid.Column width={2} textAlign='left' verticalAlign='middle'>
                                  <Button compact size='small'inverted onClick={this.toggleSidebarVisibility.bind(this)} icon='sidebar' />
                                </Grid.Column>
                                <Grid.Column width={12}  textAlign='center' verticalAlign='middle'>
                                    <Button.Group compact size='small' inverted color='green'>
                                        <Button active={this.state.activeTimelineButton === 'today'} name='today' onClick={this.handleTimelineButtonClick}>Today</Button>
                                        <Button active={this.state.activeTimelineButton === 'yesterday'} name='yesterday' onClick={this.handleTimelineButtonClick}>Yesterday</Button>
                                        <Button active={this.state.activeTimelineButton === '7days'} name='7days' onClick={this.handleTimelineButtonClick}>Last 7 Days</Button>
                                        <Button active={this.state.activeTimelineButton === '30days'} name='30days' onClick={this.handleTimelineButtonClick}>Last 30 days</Button>
                                    </Button.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Segment vertical basic>
                            <Dimmer active={this.state.showLoaders}>
                                <Loader size='large'>Loading</Loader>
                            </Dimmer>
                            <MyMapComponent
                                call_records={this.state.call_records}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBMLopQRepvrjIB2dgoGh0HHQESRYZWKJQ&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: '100%' }} />}
                                containerElement={<div style={{ height: '600px' }} />}
                                mapElement={<div style={{ height: '100%' }} />}
                            />
                            <Table celled singleLine compact inverted selectable>
                                {generateTableHeader(tableHeaders)}
                                <tbody>
                                    {generateTableRows(this.state.call_records)}
                                </tbody>
                            </Table>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default DashboardLayout;