import React, { Component } from 'react';
import { Sidebar, Segment, Button, Table, Checkbox, Popup, Form, Header, Divider, Dimmer, Loader } from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Marker from 'react-google-maps/lib/components/Marker'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { DateRange } from 'react-date-range'
import axios from 'axios'
import AppStatics from '../../helpers/AppStatics'
import Momentjs from 'moment'

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

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for (var i = 0; i < 5; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));

//     return text;
// }

function generateMarkers(jsonObjectArray){
    var markers = []
    for (var i = 0; i<jsonObjectArray.length; i++){
        var call_record = jsonObjectArray[i]
        if (!(typeof call_record === 'undefined') || !(typeof call_record.bpd_call_id === 'undefined')){
            var marker = <Marker key={call_record.bpd_call_id} position={{ lat: call_record.latitude, lng: call_record.longitude}} />
            markers.push(marker)
        }
    }
    return markers
}

function generateTableRows(jsonObjectArray){
    var rows = []
    for (var i = 0; i<jsonObjectArray.length; i++){
        var call_record = jsonObjectArray[i];
        if (!(typeof call_record === 'undefined') || !(typeof call_record.bpd_call_id === 'undefined')){
            var row = 
            (<Table.Row key={"table_row_"+call_record.bpd_call_id}>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_bpd_call_id"}>{call_record.bpd_call_id}</Table.Cell>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_time"}>{call_record.call_time}</Table.Cell>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_priority"}>{call_record.priority}</Table.Cell>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_district"}>{call_record.district}</Table.Cell>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_desc"}>{call_record.description}</Table.Cell>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_addr"}>{call_record.address}</Table.Cell>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_lat"}>{call_record.latitude}</Table.Cell>
                <Table.Cell key={"table_cell_" + call_record.bpd_call_id + "_long"}>{call_record.longitude}</Table.Cell>
            </Table.Row>);
            rows.push(row)
        }
    }
    return rows;
}

function generateTableHeader(array){
    var header_cells = []
    for (var i = 0; i < array.length; i++){
        var header_cell = (<Table.HeaderCell key={"table_header_cell_" + array[i]}>{array[i]}</Table.HeaderCell>)
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

const districts = [
    { 0: { name: 'North', value: "ND" } },
    { 1: { name: 'West', value: 'WD' } },
    { 2: { name: 'South', value: 'SD' } },
    { 3: { name: 'East', value: 'ED' } },
    { 4: { name: 'North East', value: 'NE' } },
    { 5: { name: 'North West', value: 'NW' } },
    { 6: { name: 'South East', value: 'SE' } },
    { 7: { name: 'South West', value: 'SW' } }
]

const priorities = [
    { 0: { name: 'Non-Emergency', value: 0 } },
    { 1: { name: 'Low', value: 1 } },
    { 2: { name: 'Medium', value: 2 } },
    { 3: { name: 'High', value: 3 } }
]

class DashboardLayout extends Component {

    // dummy = {
    //     data: [
    //         {
    //             "bpd_call_id": "P173330325",
    //             "call_time": "2017-11-29 06:33:00",
    //             "priority": 2,
    //             "district": "NE",
    //             "description": "911/NO  VOICE",
    //             "address": "5300 HARFORD RD",
    //             "latitude": 39.350885,
    //             "longitude": -76.562639,
    //             "created_at": "2018-01-10 02:34:47",
    //             "updated_at": "2018-01-10 02:34:47"
    //         },
    //         {
    //             "bpd_call_id": "P173330369",
    //             "call_time": "2017-11-29 07:23:00",
    //             "priority": 2,
    //             "district": "NE",
    //             "description": "HIT AND RUN",
    //             "address": "4900 ANNTANA AV",
    //             "latitude": 39.332309,
    //             "longitude": -76.540621,
    //             "created_at": "2018-01-10 02:34:48",
    //             "updated_at": "2018-01-10 02:34:48"
    //         },
    //         {
    //             "bpd_call_id": "P173330371",
    //             "call_time": "2017-11-29 07:26:00",
    //             "priority": 2,
    //             "district": "NE",
    //             "description": "AUTO THEFT",
    //             "address": "5400 PEMBROKE AV",
    //             "latitude": 39.329875,
    //             "longitude": -76.715938,
    //             "created_at": "2018-01-10 02:34:49",
    //             "updated_at": "2018-01-10 02:34:49"
    //         }
    //     ]
    // }

    formStartDate = ""
    formEndDate = ""
    formPriorities = []
    formDistricts = []

    axiosOptions = {
        baseURL: AppStatics.API_BASE_URL,
        headers: { "Content-Type": 'application/json' }
    };

    axiosInstance = axios.create(this.axiosOptions)

    constructor(props) {
        super(props);
        this.state = { visibleSidebar: false, call_records: [], isMarkerShown: false, showLoaders: true };
    }

    componentDidMount() {
        //this.setState({ showLoaders: false })
        var instance = this
        // this.axiosInstance.interceptors.request.use(function (config) {
        //     // Do something before request is sent
        //     console.log(config)
        //     return config;
        // }, function (error) {
        //     // Do something with request error
        //     return Promise.reject(error);
        // });
        this.axiosInstance.post('/records/search', {

            'start_date': /*"2017-11-28"*/Momentjs().toString(),
            'end_date': /*"2017-11-29"*/Momentjs().toString()
        })
            .then(response => {
                console.log(response.data)
                this.setState({ call_records: response.data, showLoaders: false });
            })
            .catch(function (error) {
                instance.setState({ showLoaders: false })
                console.log(error)
            });
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            error: error,
            errorInfo: errorInfo
          });

        console.log(error)
    }

    handleMarkerClick = () => {

    }

    // customRenderRow = (callRecord, index) => (

    //     // if (typeof callRecord.id === 'undefined')
    //     //     return
    //     // !(typeof callRecord === 'undefined' || typeof callRecord.id === 'undefined') ?
    //     //     <Table.Row key={"table_row_" + callRecord.id}>
    //     //         <Table.Cell>
    //     //             <Checkbox key={"table_cell_checkbox_" + callRecord.id} />
    //     //         </Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_id"}>{callRecord.bpd_call_id}</Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_time"}>{callRecord.call_time}</Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_priority"}>{callRecord.priority}</Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_district"}>{callRecord.district}</Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_desc"}>{callRecord.description}</Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_addr"}>{callRecord.address}</Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_lat"}>{callRecord.latitude}</Table.Cell>
    //     //         <Table.Cell key={"table_cell_" + callRecord.id + "_long"}>{callRecord.longitude}</Table.Cell>
    //     //     </Table.Row>
    //     //     : this.return

    //     <Table.Row key={"table_row_" + index}>
    //         {/* <Table.Cell>
    //             <Checkbox key={"table_cell_checkbox_" + callRecord.bpd_call_id} />
    //         </Table.Cell> */}
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_bpd_call_id"}>{callRecord.bpd_call_id}</Table.Cell>
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_time"}>{callRecord.call_time}</Table.Cell>
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_priority"}>{callRecord.priority}</Table.Cell>
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_district"}>{callRecord.district}</Table.Cell>
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_desc"}>{callRecord.description}</Table.Cell>
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_addr"}>{callRecord.address}</Table.Cell>
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_lat"}>{callRecord.latitude}</Table.Cell>
    //         <Table.Cell key={"table_cell_" + callRecord.bpd_call_id + "_long"}>{callRecord.longitude}</Table.Cell>
    //     </Table.Row>

    // )

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
        instance.setState({ showLoaders: true })
        console.log({
            'start_date': this.formStartDate,
            'end_date': this.formEndDate,
            'priorities': this.formPriorities,
            'districts': this.formDistricts
        });
        this.axiosInstance.post('/records/search', {

            'start_date': this.formStartDate.split(' ')[0],
            'end_date': this.formEndDate.split(' ')[0],
            'priorities': this.formPriorities,
            'districts': this.formDistricts

        })
            .then(response => {
                console.log(response.data)
                instance.setState({ call_records: response.data, showLoaders: false })
            })
            .catch(function (error) {
                instance.setState({ showLoaders: false })
                console.log(error)
            });
    }

    addMarker = (lat, long) => {

    }

    // cleanCallRecords(array) {
    //     var call_records = array
    //     if (call_records.size > 0) {
    //         for (var i = 0; i < call_records.length; i++) {
    //             if (!call_records[i]) {
    //                 this.remove(call_records, call_records[i])
    //             } else if (isNaN(call_records[i].latitude) || isNaN(call_records[i].longitude) || !call_records[i].bpd_call_id) {
    //                 this.remove(call_records, call_records[i])
    //             }
    //         }
    //     }

    //     return call_records
    // }

    remove(array, element) {
        const index = array.indexOf(element);

        if (index !== -1) {
            array.splice(index, 1);
        }
    }



    handleDateRangeSelect(range) {
        //console.log(range);
        // An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
        this.formStartDate = range.startDate.format("YYYY-MM-DD")
        this.formEndDate = range.endDate.format("YYYY-MM-DD")
    }


    toggleSidebarVisibility() {
        this.setState({ visibleSidebar: !this.state.visibleSidebar })
    } 
            

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar ref="sidebar_ref" animation='slide along' width='wide' visible={this.state.visibleSidebar} vertical='true'>
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
                                trigger={<Button onClick={this.toggleSidebarVisibility.bind(this)} icon='settings' />}
                                content="Show sidebar"
                                basic
                            />
                        </Segment>
                        <Segment basic>
                            <Dimmer active={this.state.showLoaders}>
                                <Loader size='large'>Loading</Loader>
                            </Dimmer>
                            <MyMapComponent
                                call_records={this.state.call_records}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBMLopQRepvrjIB2dgoGh0HHQESRYZWKJQ&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `600px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                            <Table celled singleLine compact inverted selectable>
                                {generateTableHeader(tableHeaders)}
                                {generateTableRows(this.state.call_records)}
                            </Table>
                        </Segment>
                    </Sidebar.Pusher>

                </Sidebar.Pushable>
            </div>
        );
    }
}

export default DashboardLayout;