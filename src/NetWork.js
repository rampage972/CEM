import React, { Component } from 'react'
import Usage from './Usage'
import Connectivity from './Connectivity'
import SearchIcon from '@material-ui/icons/Search';
import { Doughnut, Bar } from 'react-chartjs-2'
import './NetWork.css'
import DataUsageIcon from '@material-ui/icons/DataUsage';
export default class NetWork extends Component {
    constructor() {
        super()
        this.state = {
            currentWidth:0,
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
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [{
                            x: '1',
                            y: 20
                        },
                        {
                            x: '2',
                            y: 10
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 30
                        },
                        {
                            x: '5',
                            y: 20
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 20
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'two',
                        data: [{
                            x: '1',
                            y: 30
                        },
                        {
                            x: '2',
                            y: 20
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 10
                        },
                        {
                            x: '5',
                            y: 10
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 30
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
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
                        data: [{
                            x: '1',
                            y: 20
                        },
                        {
                            x: '2',
                            y: 10
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 30
                        },
                        {
                            x: '5',
                            y: 20
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 20
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#5073b7'
                    }
                    ]
                },
                dataUsageThroughput: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [{
                            x: '1',
                            y: 20
                        },
                        {
                            x: '2',
                            y: 10
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 30
                        },
                        {
                            x: '5',
                            y: 20
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 20
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'two',
                        data: [{
                            x: '1',
                            y: 30
                        },
                        {
                            x: '2',
                            y: 20
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 10
                        },
                        {
                            x: '5',
                            y: 10
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 30
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
            },
            dataConnect: {
                dataConnectPacketLoss: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [{
                            x: '1',
                            y: 20
                        },
                        {
                            x: '2',
                            y: 10
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 30
                        },
                        {
                            x: '5',
                            y: 20
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 20
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'two',
                        data: [{
                            x: '1',
                            y: 30
                        },
                        {
                            x: '2',
                            y: 20
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 10
                        },
                        {
                            x: '5',
                            y: 10
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 30
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
                dataConnectLatency: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'one',
                        data: [{
                            x: '1',
                            y: 20
                        },
                        {
                            x: '2',
                            y: 10
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 30
                        },
                        {
                            x: '5',
                            y: 20
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 20
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'two',
                        data: [{
                            x: '1',
                            y: 30
                        },
                        {
                            x: '2',
                            y: 20
                        },
                        {
                            x: '3',
                            y: 20
                        },
                        {
                            x: '4',
                            y: 10
                        },
                        {
                            x: '5',
                            y: 10
                        },
                        {
                            x: '6',
                            y: 20
                        },
                        {
                            x: '7',
                            y: 30
                        },
                        {
                            x: '8',
                            y: 30
                        },
                        {
                            x: '9',
                            y: 30
                        },
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
            },
            optionsDoughVolume: {

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
        this.setState({ isSubMenuOpened: !this.state.isSubMenuOpened })
    }
    render() {
        const { legendDoughnutVolume, legendBarLatency, optionsBarChart, isSubMenuOpened,currentWidth } = this.state
        return (
            <div>
                <div className="wrapper ">
                    
                    <div style={{zIndex:10000}} className={currentWidth > 768 ? "sidebar" : isSubMenuOpened ? "sidebar toggleSubMenu" : "sidebar"} data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                        <div className="logo" style={{ backgroundColor: "#a0bef9",cursor:"pointer" }}>
                            <span  className="simple-text logo-normal" style={{ color: "white" }}>
                                Net Work
                           </span>
                        </div>
                        <div className="sidebar-wrapper" style={{ backgroundColor: "#282a30" }}>
                            <ul className="nav">
                                <li className="nav-item" style={{cursor:"pointer"}}>
                                    <p onClick={(e)=>this.handleChangeSubMenu(e)} className="nav-link" style={{ color: "white" }}>Location</p>

                                </li>
                                <li className="nav-item" style={{cursor:"pointer"}}>
                                    <p  onClick={(e)=>this.handleChangeSubMenu(e)} className="nav-link" style={{ color: "white" }}>Roaming</p>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="main-panel">
                        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top " style={{ margin: "2em" }}>
                            <div className="container-fluid">
                                {/* <div className="navbar-wrapper">
                                    <p>Dashboard</p>
                                </div> */}
                                <button className="navbar-toggler" onClick={() => this.toggleSubmenu()} type="button" >
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="navbar-toggler-icon icon-bar"></span>
                                    <span className="navbar-toggler-icon icon-bar"></span>
                                    <span className="navbar-toggler-icon icon-bar"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-start">
                                    <form className="navbar-form" >
                                        <div className="input-group no-border">
                                            <input onChange={(e) => this.handleChangeTextSearch(e)} type="text" className="form-control" placeholder="Search..." />
                                            <button type="submit" className="btn btn-white btn-round btn-just-icon btn-search" onClick={(e) => this.handleSearch(e)}>
                                                <SearchIcon className="searchIcon" />
                                                <div className="ripple-container"></div>
                                            </button>
                                        </div>
                                    </form>
                                    {/* <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link" href="javascript:;">
                                                <i className="material-icons">dashboard</i>
                                                <p className="d-lg-none d-md-block">
                                                    Stats
                  </p>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link" href="javascript:;" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">person</i>
                                                <p className="d-lg-none d-md-block">
                                                    Account
                  </p>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                                                <a className="dropdown-item" href="#">Profile</a>
                                                <a className="dropdown-item" href="#">Settings</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="#">Log out</a>
                                            </div>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                        </nav>



                        <div className="content">
                            <div className="container-fluid">
                                <div className="content">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <Usage
                                                    dataUsage={this.state.dataUsage}
                                                    optionsBarChart={this.state.optionsBarChart}
                                                    optionsDoughVolume={this.state.optionsDoughVolume}
                                                    totalNumberVolume={this.state.totalNumberVolume}
                                                    optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                                />

                                            </div>
                                            <div className="col-lg-4">

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
                        {currentWidth<=768&&isSubMenuOpened===true?
                        <div onClick={()=>this.toggleSubmenu()} className="close-layer visible"></div>
                        : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
