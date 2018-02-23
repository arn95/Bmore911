import React, { Component } from 'react';
import HomeLayout from './HomeLayout';
import request from 'superagent'
//import superdebug from 'superagent-debugger'
import AppStatics from '../../helpers/AppStatics'
import async from 'async'

class HomeController extends Component {

    constructor(props){
        super(props)
        this.state = { today: 0, week: 0, month: 0, total: 0}
    }

    componentWillMount(){
        var instance = this
        async.series([
             (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/today').then(function(response){
                if (response.ok){
                    console.log(response)
                    instance.setState( {today: response.body.data } )
                } else if (response.body.message){
                    console.error(response.body.message)
                } else {
                    console.error("Request Failed. Unknown error.")
                }
                cb()
            }),
            (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/week').then(function(response){
                if (response.ok){
                    instance.setState( {week: response.body.data } )
                } else if (response.body.message){
                    console.error(response.body.message)
                } else {
                    console.error("Request Failed. Unknown error.")
                }
                cb()
            }),
            (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/month').then(function(response){
                if (response.ok){
                    instance.setState( {month: response.body.data } )
                } else if (response.body.message){
                    console.error(response.body.message)
                } else {
                    console.error("Request Failed. Unknown error.")
                }
                cb()
            }),
            (cb) => request.get(AppStatics.API_BASE_URL + '/records/count/total').then(function(response){
                if (response.ok){
                    instance.setState( {total: response.body.data } )
                } else if (response.body.message){
                    console.error(response.body.message)
                } else {
                    console.error("Request Failed. Unknown error.")
                }
                cb()
            }),
        ]);
    }


    render() {
        return (
            <HomeLayout today={this.state.today} week={this.state.week} month={this.state.month} total={this.state.total}/>
        );
    }
}

export default HomeController;