import React, { Component } from 'react'
import { Router, Route } from "react-router";
import { Link } from 'react-router-dom'
export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            tmpUser: "",
            tmpPass: "",
            requireUser: false,
            requirePass: false
        }
    }
    handleInputUser = (data) => {
        this.setState({ tmpUser: data.target.value })
    }
    handleInputPassword = (data) => {
        this.setState({ tmpPass: data.target.value })
    }
    handleValidateInput = (e) => {
        if (this.state.tmpPass === "" || this.state.tmpUser === "")
            e.preventDefault()
            if (this.state.tmpPass === "" ) this.setState({requirePass:true})
            else this.setState({requirePass:false})
            if (this.state.tmpUser === "" ) this.setState({requireUser:true})
            else this.setState({requireUser:false})
        }
    render() {
        const {requireUser,requirePass}=this.state
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">=

                                <div className="login100-pic js-tilt" data-tilt>
                                <img src="/asset/images/img-01.png" alt="IMG" />
                            </div>
                            <form className="login100-form validate-form">
                                <span className="login100-form-title">
                                    Member Login
              </span>
                                <div className="wrap-input100 validate-input" data-validate="User is required">
                                    <input className="input100" type="text" name="email" placeholder="User" onChange={(data) => this.handleInputUser(data)} />
                                    <span className="focus-input100" />
                                    <span className="symbol-input100">
                                        <i className="fa fa-envelope" aria-hidden="true" />
                                    </span>
                                    {requireUser === true?
                                    <p className="text-danger" style={{ paddingLeft: " 2em", float: "left" }}>User is required</p>
                                    : null
                                    }
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input className="input100" type="password" name="pass" placeholder="Password" onChange={(data) => this.handleInputPassword(data)} />
                                    <span className="focus-input100" />
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock" aria-hidden="true" />
                                    </span>
                                    {requirePass === true?
                                    <p className="text-danger" style={{ paddingLeft: " 2em", float: "left" }}>Password is required</p>
                                    : null
                                    }
                                </div>
                                <div className="container-login100-form-btn">
                                    <Link to="/dashboard" onClick={(e) => this.handleValidateInput(e)}>

                                        <button className="login100-form-btn">
                                            Login
                </button>
                                    </Link>
                                </div>
                                <div className="text-center p-t-12">
                                    <span className="txt1">
                                        Forgot
                </span>
                                    <a className="txt2" href="#">
                                        Username / Password?
                </a>
                                </div>
                                <div className="text-center p-t-136">
                                    <a className="txt2" href="#">
                                        Create your Account
                  <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
