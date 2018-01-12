import React, { Component } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
//import { Button } from 'semantic-ui-react';
import { API_BASE_URL } from '../../helpers/AppStatics';

class LoginController extends Component {
    render() {
        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <form action={API_BASE_URL + "/auth/login"} method="post" className="ui large form">
                        <div className="ui stacked secondary  segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="email" placeholder="E-mail address" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" />
                                </div>
                            </div>
                            <div className="ui fluid large green submit button">Login</div>
                        </div>

                        <div className="ui error message"></div>

                    </form>

                    <div className="ui message">Don't have an account?
                        <Link to='/register'> Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginController;