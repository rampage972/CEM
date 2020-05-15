import React, { Component } from 'react'
import Usage from './Usage'
import Connectivity from './Connectivity'
import SearchIcon from '@material-ui/icons/Search';
import { Doughnut, Bar } from 'react-chartjs-2'
import './NetWork.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import axios from 'axios'
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { faUser, faProjectDiagram, faEllipsisV, faBars, faMapMarkerAlt, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
// import SideBarBackGround from '../public/asset/image/sidebar.jpg'
export default class NetWork extends Component {
    constructor() {
        super()
        this.state = {
            typeofInterVal: "day",
            startDate: new Date("2019-12-08T23:48:00.000Z"),
            endDate: new Date("2019-12-08T23:58:00.000Z"),
            isUserMenuOpen: false,
            isMenuMiniOpened: false,
            currentWidth: 0,
            isSubMenuOpened: false,
            legendDoughnutVolume: [],
            legendBarLatency: [],
            totalNumberVolume: 0,
            requestUsage: {
                requestUsageVolume: {
                    "queryType": "timeseries",
                    "dataSource": "nio20191208FULL",
                    "descending": "false",
                    "granularity": "day",
                    "aggregations": [
                        {
                            "type": "longSum",
                            "name": "vol_in",
                            "fieldName": "Rvol_in"
                        },
                        {
                            "type": "longSum",
                            "name": "vol_out",
                            "fieldName": "Rvol_out"
                        }

                    ],
                    "intervals": ["2019-12-08T00:48:00.000Z/2019-12-08T23:58:00.000Z" ]
                }

            },
            requestConnect: {
                requestConnectLatency: {
                    "queryType": "timeseries",
                    "dataSource": "nio20191208FULL",
                    "descending": "false",
                    "granularity": "hour",
                    "aggregations": [
                        {
                            "type": "longSum",
                            "name": "Sumclient_delay",
                            "fieldName": "Rclient_delay"
                        },
                        {
                            "type": "longSum",
                            "name": "Sum_client_delayNotZero",
                            "fieldName": "client_delayNotZero"
                        },
                        {
                            "type": "longSum",
                            "name": "SumRstd",
                            "fieldName": "Rstd"
                        },
                        {
                            "type": "longSum",
                            "name": "Sum_stdNotZero",
                            "fieldName": "stdNotZero"
                        }

                    ],
                    "intervals": ["2019-12-08T20:48:00.000Z/2019-12-08T23:58:00.000Z"]
                }

            },
            dataUsage: {
                dataUsageVolume: {
                    labelData: [],
                    totalDataVolume: 0,
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
                        // ticks: {
                        //     display: false
                        // }
                    }],
                }
            },
            updateChart: true
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
        }

        dataUsageThroughput.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
        dataConnectPacketLoss.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
        
        this.setState({ dataUsage, dataConnect })
        this.setState({ totalNumberVolume: total, })
    }
    componentDidUpdate = () => {
        let requestUsageVolume = Object.assign({}, this.state.requestUsage.requestUsageVolume)
        let requestConnectLatency = Object.assign({}, this.state.requestConnect.requestConnectLatency)
        
        if (this.state.updateChart === true) {
            let dataConnect = Object.assign([], this.state.dataConnect)
            let dataUsage = Object.assign([], this.state.dataUsage)
            let dataConnectLatency = dataConnect.dataConnectLatency
            axios({
                method: 'post',
                url: '/druid/v2?pretty',
                proxy: {
                    host: '10.144.28.112',
                    port: 8082
                },
                data: requestUsageVolume,
                config: {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            })
                .then(resp => {
                    let tmpUpLink = 0
                    let tmpDownLink = 0
                    resp.data.map(item => {
                        tmpUpLink = tmpUpLink + item.result['vol_in']
                        tmpDownLink += item.result['vol_out']

                    })
                    let rawTotalDataVolume = this.bytesToSize(tmpDownLink + tmpUpLink)
                    let rawTmpUplink = this.bytesToSize(tmpUpLink)
                    let rawTmpDownlink = this.bytesToSize(tmpDownLink)
                    dataUsage.dataUsageVolume.datasets[0].data[0] = rawTmpUplink.value
                    dataUsage.dataUsageVolume.datasets[0].data[1] = rawTmpDownlink.value
                    dataUsage.dataUsageVolume.labelData[0] = rawTmpUplink.labelValue
                    dataUsage.dataUsageVolume.labelData[1] = rawTmpDownlink.labelValue
                    dataUsage.dataUsageVolume.labelData[2] = rawTotalDataVolume.labelValue
                    dataUsage.dataUsageVolume.totalDataVolume = rawTotalDataVolume.value
                    this.setState({
                        dataUsage: dataUsage,
                        updateChart: false,
                    })
                })
                .catch(err => console.error(err));
            axios({
                method: 'post',
                url: '/druid/v2?pretty',
                proxy: {
                    host: '10.144.28.112',
                    port: 8082
                },
                data: requestConnectLatency,
                config: {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            })
                .then(resp => {
                    resp.data.map((item,index)=> {
                            let a = {
                                x: index+1,
                                y: Math.floor(item.result.Sumclient_delay/item.result.Sum_client_delayNotZero)
                            }
                            let b = {
                                x: index+1,
                                y: Math.floor(item.result.SumRstd/item.result.Sum_stdNotZero)
                            }
                            dataConnectLatency.labels.push(index+1)
                            dataConnectLatency.datasets[0].data.push(a)
                            dataConnectLatency.datasets[1].data.push(b)
                        
                    })
                    dataConnectLatency.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
                    this.setState({
                        dataConnect: dataConnect,
                        updateChart: false,
                    })
                })
                .catch(err => console.error(err));
        }

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
    handleChangeStartDate = (date) => {
        this.setState({ startDate: date })
    }
    handleChangeEndDate = (date) => {
        this.setState({ endDate: date })
    }

    handleSubmitDate = () => {
        let startDate = this.state.startDate
        let endDate = this.state.endDate
        startDate = startDate.toISOString()
        endDate = endDate.toISOString()
        let requestUsage = Object.assign({}, this.state.requestUsage)
        requestUsage.requestUsageVolume.intervals = [startDate + "/" + endDate]
        this.setState({ requestUsage: requestUsage, updateChart: true })

    }
    bytesToSize = (bytes) => {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let dataReturn = {
            value: 0,
            labelValue: ""
        }
        if (bytes == 0)
            dataReturn.labelValue = "Byte";
        else {
            let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            if (i == 0) {
                dataReturn.value = bytes
                dataReturn.labelValue = sizes[i];
            }
            else {
                dataReturn.value = (bytes / Math.pow(1024, i)).toFixed(1)
                dataReturn.labelValue = sizes[i];
            }
        }
        return dataReturn
    };
    handleChangeTypeOfInterval = (data) => {
        let requestUsage = Object.assign({}, this.state.requestUsage)
        requestUsage.requestUsageVolume['granularity'] = data.target.value
        this.setState({ typeofInterVal: data.target.value, requestUsage: requestUsage, updateChart: true })

    }
    render() {
        const { typeofInterVal, isUserMenuOpen, isMenuMiniOpened, endDate, startDate, optionsBarChart, isSubMenuOpened, currentWidth } = this.state
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
                                        <div className={isUserMenuOpen ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right hidding"} aria-labelledby="navbarDropdownProfile" style={{ backgroundColor: "transparent" }}>
                                            <a className="dropdown-item" href="#">Profile</a>
                                            <a className="dropdown-item" href="#">Settings</a>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/login">
                                                <span className="dropdown-item" href="#">Log out</span>
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

                                                    <span className="dropdown-item" href="#">Log out</span>
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
                                            <div className="col-md-4 paddingLRCard">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <span>Start Date</span>
                                                        {/* <DateTime pickerOptions={{format:"LL"}} value="2017-04-20"/> */}
                                                        <React.Fragment>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DateTimePicker value={startDate} onChange={this.handleChangeStartDate} />

                                                            </MuiPickersUtilsProvider>
                                                        </React.Fragment>
                                                        {/* <DatePicker
                                                        selected={this.state.startDate}
                                                        onChange={this.handleChangeStartDate}
                                                    />
                                                     */}
                                                    </div>
                                                    <div className="col-md-5">
                                                        <span>End Date</span>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DateTimePicker value={endDate} onChange={this.handleChangeEndDate} />
                                                        </MuiPickersUtilsProvider>
                                                        {/* <DatePicker
                                                        selected={this.state.endDate}
                                                        onChange={(e) => this.handleChangeEndDate(e)}
                                                    /> */}
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button className="btn btn-white " onClick={() => this.handleSubmitDate()}>
                                                            FIND
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <FormControl component="fieldset">
                                                    <RadioGroup aria-label="gender" name="gender1" color="default" value={typeofInterVal} onChange={this.handleChangeTypeOfInterval}>
                                                        <FormControlLabel value="minute" color="default" control={<Radio />} label="Minute" />
                                                        <FormControlLabel value="hour" control={<Radio />} label="Hour" />
                                                        <FormControlLabel value="day" control={<Radio />} label="Day" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="col-md-5"></div>
                                            <div className="col-md-4 paddingLRCard">
                                                <Usage
                                                    dataUsage={this.state.dataUsage}
                                                    optionsBarChart={this.state.optionsBarChart}
                                                    optionsDoughVolume={this.state.optionsDoughVolume}
                                                    totalNumberVolume={this.state.totalNumberVolume}
                                                    optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                                />

                                            </div>
                                            <div className="col-md-4 paddingLRCard">

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
