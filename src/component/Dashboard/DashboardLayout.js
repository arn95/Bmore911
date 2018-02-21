import React, { Component } from 'react';
import { Sidebar, Segment, Button, Table, Checkbox, Popup, Form, Header, Divider, Dimmer, Loader } from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Marker from 'react-google-maps/lib/components/Marker'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { DateRange } from 'react-date-range'
import axios from 'axios'
import AppStatics from '../../helpers/AppStatics'

const BALTIMORE_LAT = 39.299236
const BALTIMORE_LONG = -76.609383

// function CallRecord(id, time, priority, district, desc, addr, lat, long) {
//     this.id = id
//     this.time = time
//     this.priority = priority
//     this.desc = desc
//     this.addr = addr
//     this.lat = lat
//     this.long = long
// }

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: BALTIMORE_LAT, lng: BALTIMORE_LONG }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.callRecords.map((record) =>
                <Marker
                    key={record.id}
                    position={{ lat: record.latitude, lng: record.longitude }}
                />
            )}
        </MarkerClusterer>

    </GoogleMap>
))

const tableHeaders = [
    'Show in map',
    'BPD Call Id',
    'Call Time',
    'Priority',
    'District',
    'Description',
    'Address',
    'Latitude',
    'Longitude'
];

const districts = [
    {0:{name:'North', value:"ND"}},
    {1:{name:'West', value:'WD'}},
    {2:{name:'South', value:'SD'}},
    {3:{name:'East', value:'ED'}},
    {4:{name:'North East', value:'NE'}},
    {5:{name:'North West', value:'NW'}},
    {6:{name:'South East', value:'SE'}},
    {7:{name:'South West', value:'SW'}}
]

const priorities = [
    {0: {name:'Non-Emergency', value:0}},
    {1: {name:'Low', value:1}},
    {2: {name:'Medium', value:2}},
    {3: {name:'High', value:3}}
]

class DashboardLayout extends Component {

    formStartDate = ""
    formEndDate = ""
    formPriorities = []
    formDistricts = []

    constructor(props) {
        super(props);
        this.state = { visibleSidebar: false, isMarkerShown: false, call_records: [], showLoaders: true };
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    componentWillMount() {
        var instance = this
        axios.post(AppStatics.API_BASE_URL + '/records/search', {
                
                'start_date': Date(),
                'end_date': Date()
        })
        .then(response => {
            instance.setState({call_records: response.data, showLoaders: false})
        })
        .catch(function(error) {
            instance.setState({showLoaders:false})
            console.log(error)
        });
    }

    dummyCallRecords = () => [
        { id: 'P173321597', time: '2017-11-28 15:31:00', priority: '2', district: 'ED', desc: 'NARCOTICSOutside', addr: '2300 BLK E PRESTON ST', lat: 39.30570900, long: -76.58510300 },
        { id: 'P173321591', time: '2017-11-28 15:31:00', priority: '2', district: 'ED', desc: 'NARCOTICSOutside', addr: '2300 BLK E PRESTON ST', lat: 39.30570900, long: -76.58510300 }
    ]

    componentDidMount() {
    }

    handleMarkerClick = () => {

    }

    customRenderRow = (callRecord, index) => [
        { content: <Checkbox key={"table_cell_checkbox_" + callRecord.id }/> },
        { content: callRecord.bpd_call_id, key:("table_cell_" + callRecord.id + "_id")},
        { content: callRecord.call_time, key:("table_cell_" + callRecord.id + "_time") },
        { content: callRecord.priority, key:("table_cell_" + callRecord.id + "_priority")},
        { content: callRecord.district, key:("table_cell_" + callRecord.id + "_district")},
        { content: callRecord.description, key:("table_cell_" + callRecord.id + "_desc") },
        { content: callRecord.address, key:("table_cell_" + callRecord.id + "_addr") },
        { content: callRecord.latitude, key:("table_cell_" + callRecord.id + "_lat") },
        { content: callRecord.longitude, key:("table_cell_" + callRecord.id + "_long") }
    ]

    handlePriorityChange = (event, data) => {
        if (data.checked){
            this.formPriorities.push(data.value)
        } else {
            const index = this.formPriorities.indexOf(data.value)
            if (index !== -1){
                this.formPriorities.splice(index,1)
            }
        }
        console.log(this.formPriorities)
    }

    handleDistrictChange = (event, data) => {
        if (data.checked){
            this.formDistricts.push(data.value)
        } else {
            const index = this.formDistricts.indexOf(data.value)
            if (index !== -1){
                this.formDistricts.splice(index,1)
            }
        }
        console.log(this.formDistricts)
    }

    handleFilterFormSubmit = () => {
        var instance = this
        console.log({
            'start_date': this.formStartDate,
            'end_date': this.formEndDate,
            'priorities': this.formPriorities,
            'districts': this.formDistricts
        });
        axios.post(AppStatics.API_BASE_URL + '/records/search', {
            
                'start_date': this.formStartDate,
                'end_date': this.formEndDate,
                'priority': this.formPriorities,
                'districts': this.formDistricts
            
        })
        .then(response => {
            instance.setState({call_records: response.data, showLoaders: false})
        })
        .catch(function(error) {
            instance.setState({showLoaders:false})
            console.log(error)
        });
    }

    addMarker = (lat, long) => {

    }

    handleDateRangeSelect(range){
		//console.log(range);
		// An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
        this.formStartDate = range.startDate.format("YYYY-MM-DD")
        this.formEndDate = range.endDate.format("YYYY-MM-DD")
        console.log(this.formStartDate)
        console.log(this.formEndDate)
	}


    toggleVisibility = () => this.setState({ visibleSidebar: !this.state.visibleSidebar })

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar animation='slide along' width='wide' visible={this.state.visibleSidebar} vertical='true'>
                        <Form style={{ margin: 10 }} onSubmit={this.handleFilterFormSubmit.bind(this)}>
                            <Header as='h4'>Filters</Header>
                            <Divider horizontal>Date Range</Divider>
                            <DateRange
                                onInit={this.handleDateRangeSelect.bind(this)}
                                onChange={this.handleDateRangeSelect.bind(this)}    
                            />
                            <Divider horizontal>Priority</Divider>
                            {priorities.map((name, index) =>
                                <Form.Field key={"priority_field_" + index}>
                                    <Checkbox
                                        key={"priority_checkbox_" + index}
                                        label={name[index].name}
                                        value={name[index].value}
                                        onChange={this.handlePriorityChange}
                                    />
                                </Form.Field>
                            )}
                            <Divider horizontal>District</Divider>
                            {districts.map((districts, index) =>
                                <Form.Field key={"district_field_" + index}>
                                    <Checkbox
                                        key={"district_checkbox_" + index}
                                        label={districts[index].name}
                                        value={districts[index].value}
                                        onChange={this.handleDistrictChange}
                                    />
                                </Form.Field>
                            )}
                            <Form.Button>Submit</Form.Button>
                        </Form>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic textAlign='left'>
                            <Popup
                                trigger={<Button onClick={this.toggleVisibility} icon='settings' />}
                                content="Show sidebar"
                                basic
                            />
                        </Segment>
                        <Segment basic>
                        <Dimmer active={this.state.showLoaders}>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                            <MyMapComponent
                                callRecords={this.state.call_records}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBdF1qr74wlk73VU12_RCfnSWgUC0qwAqE&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `600px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                            <Table celled singleLine compact inverted selectable headerRow={tableHeaders} renderBodyRow={this.customRenderRow} tableData={this.state.callRecords} />
                        </Segment>
                    </Sidebar.Pusher>

                </Sidebar.Pushable>
            </div>
        );
    }
}

export default DashboardLayout;