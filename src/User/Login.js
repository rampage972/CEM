import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faLongArrowAltRight, faUser, faLock, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import './Login.css'
import { sha256 } from 'js-sha256';
import { loginService, registerService } from '../service'
export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            tmpUser: "",
            tmpPass: "",
            tmpRePass: "",
            requireUser: false,
            requireName: false,
            requirePass: false,
            requireRePass: false,
            isRegister: false,
            isLogin: false,
            tmpName: "",
        }
        this.inputPassword = React.createRef()
        this.registerBtn = React.createRef()
        this.loginBtn = React.createRef()
    }
    componentDidMount = () => {
        window.addEventListener('keydown', (e) => this.listenKeyEnter(e));
    }
    componentWillUnmount = () => {
        window.removeEventListener('keydown', (e) => this.listenKeyEnter(e));
    }
    listenKeyEnter = (e) => {
        if (e.key === "Enter" && this.state.isRegister) {
            this.registerBtn.current.click()
        }
        else if (e.key === "Enter" && !this.state.isRegister) this.loginBtn.current.click()
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
    handleInputName = (data) => {
        this.setState({ tmpName: data.target.value })
    }

    handleValidateInput = (e) => {
        e.preventDefault()
        if (this.state.tmpPass === "" || this.state.tmpPass === "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855") this.setState({ requirePass: true })
        else this.setState({ requirePass: false })
        if (this.state.tmpUser === "") this.setState({ requireUser: true })
        else this.setState({ requireUser: false })
        if (this.state.tmpPass !== "" && this.state.tmpUser !== "" && this.state.tmpPass !== "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855") {
            let data = {
                "username": this.state.tmpUser,
                "password": this.state.tmpPass,
            }
            loginService(data).then(res => {
                console.log(res)
                if (res.data) {
                    this.setState({ isLogin: true })
                }
                else {
                    alert("Wrong usename or password")
                    e.persist()
                }
            }).catch(err => {
                e.persist()
                console.log(err)
            })

        }
    }

    changeLoginToRegister = () => {
        this.inputPassword.current.value = ""
        this.setState({
            isRegister: !this.state.isRegister,
            tmpPass: "",
            tmpRePass: "",
            requireUser: false,
            requirePass: false,
            requireRePass: false,
        })
    }

    registerUser = (e) => {
        if (this.state.tmpPass === "" || this.state.tmpUser === "" || this.state.tmpName === "" || this.state.tmpRePass === "")
            e.preventDefault()
        if (this.state.tmpPass === "" || this.state.tmpPass === "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855") this.setState({ requirePass: true })
        else this.setState({ requirePass: false })
        if (this.state.tmpUser === "") this.setState({ requireUser: true })
        else this.setState({ requireUser: false })
        if (this.state.tmpName === "") this.setState({ requireName: true })
        else this.setState({ requireName: false })
        if (this.state.tmpPass !== this.state.tmpRePass) this.setState({ requireRePass: true })
        else this.setState({ requireRePass: false })
        if (!this.state.requirePass && !this.state.requireRePass && !this.state.requireUser && !this.state.requireName) {
            let data = {
                "username": this.state.tmpUser,
                "password": this.state.tmpPass,
                "name": this.state.tmpName
            }
            registerService(data).then(res => {
                if (res.data) {
                    alert("Register Succeed")
                    this.setState({ isRegister: false })
                }
                else {
                    e.persist()
                    alert("Username already exists")
                }
            }).catch(err => {
                e.persist()
                console.log(err)
            })

        }

    }
    render() {
        const { requireUser, requirePass, isRegister, requireRePass, isLogin } = this.state
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-pic js-tilt" data-tilt>
                                <img src="/asset/image/img-01.png" alt="IMG" />
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

                                    <input className="input100" type="text" placeholder="User" onChange={(data) => this.handleInputUser(data)} />
                                    <span className="focus-input100" />
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    {requireUser === true ?
                                        <p className="text-danger validateText" style={{ paddingLeft: " 2em", float: "left" }}>User is required</p>
                                        : null
                                    }
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">

                                    <input className="input100" type="password" placeholder="Password" onChange={(data) => this.handleInputPassword(data)} ref={this.inputPassword} />
                                    <span className="focus-input100" />
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                    {requirePass === true ?
                                        <p className="text-danger validateText" style={{ paddingLeft: " 2em", float: "left" }}>Password is required</p>
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
                                    <div>
                                        <div className="wrap-input100 validate-input" >
                                            <input className="input100" type="password" placeholder="Repeat Password" onChange={(data) => this.handleInputRePassword(data)} />
                                            <span className="focus-input100" />
                                            <span className="symbol-input100">
                                                <FontAwesomeIcon icon={faKeyboard} />
                                            </span>
                                            {requireRePass === true ?
                                                <p className="text-danger validateText" style={{ paddingLeft: " 2em", float: "left" }}>Password entered not match</p>
                                                : null
                                            }
                                        </div>
                                        <div className="wrap-input100 validate-input">
                                            <input className="input100" type="text" placeholder="Name" onChange={(data) => this.handleInputName(data)} />
                                            <span className="focus-input100" />
                                            <span className="symbol-input100">
                                                <FontAwesomeIcon icon={faKeyboard} />
                                            </span>
                                            {requireRePass === true ?
                                                <p className="text-danger validateText" style={{ paddingLeft: " 2em", float: "left" }}>Name is required</p>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </CSSTransition>

                                <div className="container-login100-form-btn">
                                    {isRegister ?
                                        <button className="login100-form-btn" onClick={(e) => this.registerUser(e)} ref={this.registerBtn}>
                                            Register
                                        </button>
                                        :
                                        <button to="/dashboard" onClick={(e) => this.handleValidateInput(e)} className="login100-form-btn" ref={this.loginBtn}>
                                            Login
                                        </button>

                                    }
                                    {isLogin ? <Redirect to={{ pathname: "/dashboard", state: { isAuthen: this.state.isLogin, } }} /> : null}
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
