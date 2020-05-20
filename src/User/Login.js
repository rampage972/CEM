import React, { Component } from 'react'
import { Router, Route } from "react-router";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faLongArrowAltRight, faUser, faLock, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import './Login.css'
import { sha256, sha224 } from 'js-sha256';
export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            tmpUser: "",
            tmpPass: "",
            tmpRePass: "",
            requireUser: false,
            requirePass: false,
            requireRePass: false,
            isRegister: false
        }
    }

    handleInputUser = (data) => {
        this.setState({ tmpUser: data.target.value })
    }

    handleInputPassword = (data) => {
        this.setState({ tmpPass: sha256(data.target.value) })
    }

    handleInputRePassword = (data) => {
        this.setState({ tmpRePass: sha256(data.target.value) })
    }

    handleValidateInput = (e) => {
        if (this.state.tmpPass === "" || this.state.tmpUser === "")
            e.preventDefault()
        if (this.state.tmpPass === "") this.setState({ requirePass: true })
        else this.setState({ requirePass: false })
        if (this.state.tmpUser === "") this.setState({ requireUser: true })
        else this.setState({ requireUser: false })

    }

    changeLoginToRegister = () => {
        this.setState({
            isRegister: !this.state.isRegister,
            tmpUser: "",
            tmpPass: "",
            tmpRePass: "",
            requireUser: false,
            requirePass: false,
            requireRePass: false,
        })
    }

    registerUser = (e) => {
        if (this.state.tmpPass === "" || this.state.tmpUser === "")
            e.preventDefault()
        if (this.state.tmpPass === "") this.setState({ requirePass: true })
        else this.setState({ requirePass: false })
        if (this.state.tmpUser === "") this.setState({ requireUser: true })
        else this.setState({ requireUser: false })
        if (this.state.tmpPass != this.state.tmpRePass) this.setState({ requireRePass: true })
        else this.setState({ requireRePass: false })
    }
    render() {
        const { requireUser, requirePass, isRegister, requireRePass } = this.state
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-pic js-tilt" data-tilt>
                                <img src="/asset/images/img-01.png" alt="IMG" />
                            </div>
                            <div className="login100-form validate-form">
                                {isRegister ?
                                    <span className="login100-form-title">
                                        Member Resgister
                                </span>
                                    :
                                    <span className="login100-form-title">
                                        Member Login
                                </span>
                                }
                                <div className="wrap-input100 validate-input" data-validate="User is required">

                                    <input className="input100" type="text" name="email" placeholder="User" onChange={(data) => this.handleInputUser(data)} />
                                    <span className="focus-input100" />
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    {requireUser === true ?
                                        <p className="text-danger" style={{ paddingLeft: " 2em", float: "left" }}>User is required</p>
                                        : null
                                    }
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">

                                    <input className="input100" type="password" name="pass" placeholder="Password" onChange={(data) => this.handleInputPassword(data)} />
                                    <span className="focus-input100" />
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                    {requirePass === true ?
                                        <p className="text-danger" style={{ paddingLeft: " 2em", float: "left" }}>Password is required</p>
                                        : null
                                    }
                                </div>
                                <CSSTransition
                                    in={this.state.isRegister}
                                    timeout={500}
                                    classNames="alert"
                                    unmountOnExit
                                    appear
                                >
                                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                                        <input className="input100" type="password" name="pass" placeholder="Repeat Password" onChange={(data) => this.handleInputRePassword(data)} />
                                        <span className="focus-input100" />
                                        <span className="symbol-input100">
                                            <FontAwesomeIcon icon={faKeyboard} />
                                        </span>
                                        {requireRePass === true ?
                                            <p className="text-danger" style={{ paddingLeft: " 2em", float: "left" }}>Password entered not match</p>
                                            : null
                                        }
                                    </div>
                                </CSSTransition>

                                <div className="container-login100-form-btn">
                                    {isRegister ?
                                        <button className="login100-form-btn" onClick={(e) => this.registerUser(e)}>
                                            Register
                                        </button>
                                        :
                                        <Link to="/dashboard" onClick={(e) => this.handleValidateInput(e)}>
                                            <button className="login100-form-btn">
                                                Login
                                            </button>
                                        </Link>
                                    }
                                </div>
                                {/* <div className="text-center p-t-12">
                                    <span className="txt1">
                                        Forgot
                </span>
                                    <a className="txt2" href="#">
                                        Username / Password?
                </a>
                                </div> */}
                                <div className="text-center p-t-136">
                                    <button className="txt2" onClick={() => this.changeLoginToRegister()}>
                                        {isRegister ?
                                            <>
                                                <span>Have Account? Login Now</span>
                                                <FontAwesomeIcon icon={faLongArrowAltLeft} className="m-l-5" />
                                            </>
                                            :
                                            <>
                                                <span> Create your Account</span>
                                                <FontAwesomeIcon icon={faLongArrowAltRight} className="m-l-5" />
                                            </>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
