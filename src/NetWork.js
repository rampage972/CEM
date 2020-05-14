import React, { Component } from 'react'
import Usage from './Usage'
import Connectivity from './Connectivity'
import SearchIcon from '@material-ui/icons/Search';
import { Doughnut, Bar } from 'react-chartjs-2'
import './NetWork.css'
import DataUsageIcon from '@material-ui/icons/DataUsage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import { faUser, faProjectDiagram, faEllipsisV, faBars, faMapMarkerAlt, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
// import SideBarBackGround from '../public/asset/image/sidebar.jpg'
export default class NetWork extends Component {
    constructor() {
        super()
        this.state = {
            isUserMenuOpen: false,
            isMenuMiniOpened: false,
            currentWidth: 0,
            isSubMenuOpened: false,
            legendDoughnutVolume: [],
            legendBarLatency: [],
            totalNumberVolume: 0,
            dataUsage: {
                dataUsageVolume: {
                    labels: ['Uplink', 'Downlink'],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        data: [1.5, 16.5],
                        backgroundColor: [
                            'rgba(63, 92, 149, 1)',
                            'rgba(136, 147, 174, 1)',

                        ],
                        borderColor: [
                            'white',
                            'white',
                        ],
                        borderWidth: 1
                    }]
                },
                dataUsageThroughput: {
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'Uplink',
                        data: [
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'Downlink',
                        data: [
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
                dataUsageActiveSubcriber: {
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [
                        ],
                        backgroundColor: '#5073b7'
                    }
                    ]
                },
                dataUsageThroughput: {
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'two',
                        data: [
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
            },
            dataConnect: {
                dataConnectPacketLoss: {
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'two',
                        data: [
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
                dataConnectLatency: {
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'two',
                        data: [
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
            },
            optionsDoughVolume: {
                tooltips: {
                    titleFontSize: 6,
                    bodyFontSize: 8
                },
                responsive: true,
                cutoutPercentage: 80,
                legend: {
                    display: false
                }

            },
            optionsBarChart: {
                legend: {
                    display: false
                }
            },
            optionsBarToNegativeNumb: {
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let value = parseInt(tooltipItem.value, 10)
                            value = Math.abs(value)
                            return value
                        },
                    }
                },
                scales: {
                    xAxes: [{
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        stacked: true,
                        display: false,
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            display: false
                        }
                    }],
                }
            }
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentWillMount = () => {
        let dataUsage = Object.assign([], this.state.dataUsage)
        let dataConnect = Object.assign([], this.state.dataConnect)
        let total = (dataUsage.dataUsageVolume.datasets[0].data[0] + dataUsage.dataUsageVolume.datasets[0].data[1])




        //fake data for Subcriber
        let dataUsageActiveSubcriber = dataUsage.dataUsageActiveSubcriber
        for (let i = 1; i <= 1000; i++) {
            let a = {
                x: i,
                y: Math.floor(Math.random() * 100)
            }
            dataUsageActiveSubcriber.labels.push(i)
            dataUsageActiveSubcriber.datasets[0].data.push(a)
        }
        //fake data for OTher
        let dataUsageThroughput = dataUsage.dataUsageThroughput
        let dataConnectPacketLoss = dataConnect.dataConnectPacketLoss
        let dataConnectLatency = dataConnect.dataConnectLatency
        for (let i = 1; i <= 60; i++) {
            let a = {
                x: i,
                y: Math.floor(Math.random() * 100)
            }
            let b = {
                x: i,
                y: Math.floor(Math.random() * 100)
            }
            dataUsageThroughput.labels.push(i)
            dataUsageThroughput.datasets[0].data.push(a)
            dataUsageThroughput.datasets[1].data.push(b)
            dataConnectPacketLoss.labels.push(i)
            dataConnectPacketLoss.datasets[0].data.push(a)
            dataConnectPacketLoss.datasets[1].data.push(b)
            dataConnectLatency.labels.push(i)
            dataConnectLatency.datasets[0].data.push(a)
            dataConnectLatency.datasets[1].data.push(b)
        }

        dataUsageThroughput.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
        dataConnectPacketLoss.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
        dataConnectLatency.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
        this.setState({ dataUsage, dataConnect })
        this.setState({ totalNumberVolume: total, })
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
    handleClick = () => {
        let tmp = this.state.count
        tmp = tmp + 1
        this.setState({
            count: tmp
        })
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
    render() {
        const { isUserMenuOpen, isMenuMiniOpened, legendDoughnutVolume, legendBarLatency, optionsBarChart, isSubMenuOpened, currentWidth } = this.state
        return (
            <div className={isMenuMiniOpened ? "sidebar-mini" : ""}>
                <div className="wrapper ">

                    <div style={{ zIndex: 10000 }} className={currentWidth > 991 ? "sidebar" : isSubMenuOpened ? "sidebar toggleSubMenu" : "sidebar"} data-color="azure" data-background-color="black" data-image="../assets/img/sidebar-1.jpg">
                        <div className="logo" style={{ cursor: "pointer" }}>

                            <a className="simple-text logo-mini" style={{ color: "white", fontSize: "2em", overflow: "unset" }}>
                                <FontAwesomeIcon icon={faProjectDiagram} />
                            </a>

                            <a className="simple-text logo-normal" style={{ color: "white" }}>
                                Net Work
                            </a>
                        </div>
                        <div className="sidebar-wrapper" >
                            <ul className="nav">
                                <li className="nav-item" style={{ cursor: "pointer" }}>
                                    <a className="nav-link" onClick={(e) => this.handleChangeSubMenu(e)}>
                                        <i className="material-icons"><FontAwesomeIcon icon={faMapMarkerAlt} /></i>
                                        <p> Location </p>
                                    </a>
                                    {/* <p onClick={(e)=>this.handleChangeSubMenu(e)} className="nav-link" style={{ color: "white" }}>Location</p> */}

                                </li>

                                <li className="nav-item" style={{ cursor: "pointer" }}>

                                    <a className="nav-link" onClick={(e) => this.handleChangeSubMenu(e)}>
                                        <i className="material-icons"><FontAwesomeIcon icon={faPlaneDeparture} /></i>
                                        <p> Roaming </p>
                                    </a>

                                </li>

                                {currentWidth <= 991 ?
                                    <li className="nav-item dropdown " onClick={() => this.openUserSubMenu()}>
                                        <a className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="material-icons"><FontAwesomeIcon icon={faUser} /></i>
                                            <p >
                                                Account
                  </p>
                                        </a>
                                        <div className={isUserMenuOpen ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right hidding"} aria-labelledby="navbarDropdownProfile" style={{backgroundColor:"transparent"}}>
                                            <a className="dropdown-item" href="#">Profile</a>
                                            <a className="dropdown-item" href="#">Settings</a>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/login">
                                            <a className="dropdown-item" href="#">Log out</a>
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
                                                <a className="dropdown-item" href="#">Profile</a>
                                                <a className="dropdown-item" href="#">Settings</a>
                                                <div className="dropdown-divider"></div>
                                                <Link to="/login">

                                                <a className="dropdown-item" href="#">Log out</a>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>

                                </div>

                            </div>
                        </nav>



                        <div className="content">
                            <div className="container-fluid">
                                <div className="content">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-lg-4 paddingLRCard">
                                                <Usage
                                                    dataUsage={this.state.dataUsage}
                                                    optionsBarChart={this.state.optionsBarChart}
                                                    optionsDoughVolume={this.state.optionsDoughVolume}
                                                    totalNumberVolume={this.state.totalNumberVolume}
                                                    optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                                />

                                            </div>
                                            <div className="col-lg-4 paddingLRCard">

                                                <Connectivity
                                                    dataConnect={this.state.dataConnect}
                                                    optionsBarChart={this.state.optionsBarChart}
                                                    totalNumberVolume={this.state.totalNumberVolume}
                                                    optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                                />


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
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
