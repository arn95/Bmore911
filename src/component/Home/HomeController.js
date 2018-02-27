import React, { Component } from 'react';
import HomeLayout from './HomeLayout';
import request from 'superagent'
//import superdebug from 'superagent-debugger'
import AppStatics from '../../helpers/AppStatics'
import async from 'async'

class HomeController extends Component {

    constructor(props) {
        super(props)
        this.state = { totals: {} }
    }

    componentWillMount() {
        var instance = this
        // //Fetches all the totals to display in the stats section in async.
        // async.series([
        //      (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/today').then(function(response){
        //         if (response.ok){
        //             instance.setState( {today: response.body.data } )
        //         } else if (response.body.message){
        //             console.error(response.body.message)
        //         } else {
        //             console.error('Request Failed. Unknown error.')
        //         }
        //         cb()
        //     }),
        //     (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/week').then(function(response){
        //         if (response.ok){
        //             instance.setState( {week: response.body.data } )
        //         } else if (response.body.message){
        //             console.error(response.body.message)
        //         } else {
        //             console.error('Request Failed. Unknown error.')
        //         }
        //         cb()
        //     }),
        //     (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/month').then(function(response){
        //         if (response.ok){
        //             instance.setState( {month: response.body.data } )
        //         } else if (response.body.message){
        //             console.error(response.body.message)
        //         } else {
        //             console.error('Request Failed. Unknown error.')
        //         }
        //         cb()
        //     }),
        //     (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/year').then(function(response){
        //         if (response.ok){
        //             instance.setState( {year: response.body.data } )
        //         } else if (response.body.message){
        //             console.error(response.body.message)
        //         } else {
        //             console.error('Request Failed. Unknown error.')
        //         }
        //         cb()
        //     })
        // ]);

        request.get(AppStatics.API_BASE_URL + '/records/count/all').then(function (response) {
            if (response.ok) {
                instance.setState({ totals: response.body.data })
            } else if (response.body.message) {
                console.error(response.body.message)
            } else {
                console.error('Request Failed. Unknown error.')
            }
        })
    }


    render() {
        return (
            <HomeLayout totals={this.state.totals} />
        );
    }
}

export default HomeController;