import React, { Component } from 'react'
import Summary from './Summary/Summary';
import TopApplications from './TopApplications/TopApplications';
import SearchIcon from '@material-ui/icons/Search'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Redirect } from "react-router-dom"
import { faUser, faProjectDiagram, faEllipsisV, faBars, faMapMarkerAlt, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './National.css'
export default class National extends Component {
    constructor() {
        super()
        this.state = {
            currentNational: 0,
            currentWidth: 0,
            isUserMenuOpen: false,
            isMenuMiniOpened: false,
            isSubMenuOpened: false,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount = () => {
        // this.setState({ legendDoughnutVolume: this.doughnutVolume.chartInstance.legend.legendItems });
        // this.setState({ legendBarLatency: this.barLatency.chartInstance.legend.legendItems });
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ currentWidth: window.innerWidth });
    }

    handleSearch = (e) => {
        e.preventDefault();
    }
    handleChangeTextSearch = (e) => {

    }

    handleChangeSubMenu = (e) => {
        e.preventDefault();
    }

    toggleSubmenu = () => {
        this.setState({ isSubMenuOpened: !this.state.isSubMenuOpened, isUserMenuOpen: false })
    }

    toggleMenuMini = () => {
        this.setState({
            isMenuMiniOpened: !this.state.isMenuMiniOpened
        })
    }

    openUserSubMenu = () => {
        this.setState({
            isUserMenuOpen: !this.state.isUserMenuOpen
        })
    }

    handleChangeNational = (data, index) => {
        this.setState({ currentNational: index })
    }

    render() {
        const { currentNational, typeofInterVal, isUserMenuOpen, isMenuMiniOpened, endDate, startDate, isSubMenuOpened, currentWidth, currentSummary } = this.state

        return (
            <div className={isMenuMiniOpened ? "sidebar-mini" : ""}>
                {/* {this.props.location.state ? this.props.location.state.isAuthen ?
                    null
                    :
                    <Redirect to="/login" />
                    :
                    <Redirect to="/login" />
                } */}
                <div className="wrapper ">

                    {/* SIDE MENU */}

                    <div style={{ zIndex: 900 }} className={currentWidth > 991 ? "sidebar" : isSubMenuOpened ? "sidebar toggleSubMenu" : "sidebar"} data-color="azure" data-background-color="black" data-image="../assets/img/sidebar-1.jpg">
                        <div className="logo" style={{ cursor: "pointer" }}>

                            <a className="simple-text logo-mini" style={{ color: "white", fontSize: "2em", overflow: "unset" }}>
                                <FontAwesomeIcon icon={faProjectDiagram} />
                            </a>

                            <a className="simple-text logo-normal" style={{ color: "white" }}>
                                Net Work
                            </a>
                        </div>
                        <div className="sidebar-wrapper" style={{ overflowX: "hidden" }}>
                            <ul className="nav">
                                <li className="nav-item" style={{ cursor: "pointer" }}>
                                    <a className="nav-link" onClick={(e) => this.handleChangeSubMenu(e)}>
                                        <i className="material-icons"><FontAwesomeIcon icon={faMapMarkerAlt} /></i>
                                        <p className="menu-item-label"> Location </p>
                                    </a>
                                    {/* <p onClick={(e)=>this.handleChangeSubMenu(e)} className="nav-link" style={{ color: "white" }}>Location</p> */}

                                </li>

                                <li className="nav-item" style={{ cursor: "pointer" }}>

                                    <a className="nav-link" onClick={(e) => this.handleChangeSubMenu(e)}>
                                        <i className="material-icons"><FontAwesomeIcon icon={faPlaneDeparture} /></i>
                                        <p className="menu-item-label"> Roaming </p>
                                    </a>

                                </li>
                                {currentWidth <= 991 ?
                                    <li className="nav-item dropdown " onClick={() => this.openUserSubMenu()}>
                                        <a className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="material-icons"><FontAwesomeIcon icon={faUser} /></i>
                                            <p className="menu-item-label">
                                                Account
                  </p>
                                        </a>
                                        <div className={isUserMenuOpen ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right hidding"} aria-labelledby="navbarDropdownProfile" style={{ backgroundColor: "transparent" }}>
                                            <a className="dropdown-item" >Profile</a>
                                            <a className="dropdown-item" >Settings</a>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/login">

                                                <span className="dropdown-item" >Log out</span>
                                            </Link>
                                        </div>
                                    </li>
                                    : null
                                }
                            </ul>
                        </div>
                        <div className="sidebar-background" ></div>
                    </div>
                    <div className="main-panel">
                        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                            <div className="container-fluid">
                                {/* <div className="navbar-wrapper">
                                    <p>Dashboard</p>
                                </div> */}
                                <div className="navbar-minimize" style={{ marginRight: "1em" }}>
                                    <button onClick={() => this.toggleMenuMini()} id="minimizeSidebar" className="btn btn-just-icon btn-white btn-fab btn-round">
                                        <FontAwesomeIcon icon={faEllipsisV} className="text_align-center visible-on-sidebar-regular" />
                                        <FontAwesomeIcon icon={faBars} className=" design_bullet-list-67 visible-on-sidebar-mini" />
                                    </button>
                                </div>
                                <button className="navbar-toggler" onClick={() => this.toggleSubmenu()} type="button" >
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="navbar-toggler-icon icon-bar"></span>
                                    <span className="navbar-toggler-icon icon-bar"></span>
                                    <span className="navbar-toggler-icon icon-bar"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end">
                                    <form className="navbar-form" >
                                        <div className="input-group no-border">
                                            <input onChange={(e) => this.handleChangeTextSearch(e)} type="text" className="form-control" placeholder="Search..." />
                                            <button type="submit" className="btn btn-white btn-round btn-just-icon btn-search" onClick={(e) => this.handleSearch(e)}>
                                                <SearchIcon className="searchIcon" />
                                                <div className="ripple-container"></div>
                                            </button>
                                        </div>
                                    </form>

                                    <ul className="navbar-nav">
                                        {/* <li className="nav-item">
                                            <a className="nav-link" href="#pablo">
                                                <i className="material-icons">dashboard</i>
                                                <p className="d-lg-none d-md-block">
                                                    Stats
                  </p>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link" href="http://example.com/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">notifications</i>
                                                <span className="notification">5</span>
                                                <p className="d-lg-none d-md-block">
                                                    Some Actions
                  </p>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                                <a className="dropdown-item" href="#">Mike John responded to your email</a>
                                                <a className="dropdown-item" href="#">You have 5 new tasks</a>
                                                <a className="dropdown-item" href="#">You're now friend with Andrew</a>
                                                <a className="dropdown-item" href="#">Another Notification</a>
                                                <a className="dropdown-item" href="#">Another One</a>
                                            </div>
                                        </li> */}
                                        <li className="nav-item dropdown " onClick={() => this.openUserSubMenu()}>
                                            <a className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <FontAwesomeIcon icon={faUser} />
                                                <p className="d-lg-none d-md-block">
                                                    Account
                  </p>
                                            </a>
                                            <div className={isUserMenuOpen ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right hidding"} aria-labelledby="navbarDropdownProfile">
                                                <a className="dropdown-item" >Profile</a>
                                                <a className="dropdown-item" >Settings</a>
                                                <div className="dropdown-divider"></div>
                                                <Link to="/login">

                                                    <span className="dropdown-item" >Log out</span>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>

                                </div>

                            </div>
                        </nav>


                        <div className="content">
                            <div className="panel-header">

                                {/*MENU CHANGE COMPONENT */}
                                <div className="page-inner border-bottom pb-0 mb-3">


                                    <div className="d-flex align-items-left flex-column">
                                        <div className="nav-scroller d-flex">
                                            <div className="nav nav-line nav-color-info d-flex align-items-center justify-contents-center">

                                                <Tabs
                                                    value={currentNational}
                                                    indicatorColor="primary"
                                                    textColor="primary"
                                                    onChange={this.handleChangeNational}
                                                    aria-label="disabled tabs example"
                                                >
                                                    <Tab className="tabSummary" label={<span className={"tabLabel"}>Summary</span>} />
                                                    <Tab className="tabSummary" label={<span className={"tabLabel"}>Top Applications</span>} />
                                                </Tabs>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {currentNational === 0 ?
                                <Summary
                                    currentWidth={this.state.currentWidth}
                                    isSubMenuOpened={this.state.isSubMenuOpened}
                                />
                                : currentNational === 1 ?
                                    <TopApplications currentWidth={this.state.currentWidth} />
                                    : null
                            }

                        </div>
                        {currentWidth <= 991 && isSubMenuOpened === true ?
                            <div onClick={() => this.toggleSubmenu()} className="close-layer visible"></div>
                            : null
                        }
                    </div>
                </div>
            </div>

        )
    }
}
