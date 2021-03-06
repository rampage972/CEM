import React, { Component } from 'react'

import { Doughnut, Bar } from 'react-chartjs-2'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons'

export default class Usage extends Component {
    constructor() {
        super()
        this.state = {
            legendDoughnutVolume: [],
            legendBarThroughput: [],
            legendBarLatency: [],
            fakedata: []
        }
    }
    componentDidMount = () => {

        if (this.doughnutVolume) {
            this.setState({ legendDoughnutVolume: this.doughnutVolume.chartInstance.legend.legendItems });
        }
        this.barThroughput && this.setState({ legendBarThroughput: this.barThroughput.chartInstance.legend.legendItems });

    }
    findPeakActiveSub = () => {
        let biggestNumb = 0
        this.props.dataUsage.dataUsageActiveSubcriber.datasets[0].data.map(item => {
            if (biggestNumb < item.y)
                biggestNumb = item.y
        })
        return biggestNumb
    }
    render() {
        const { legendDoughnutVolume, legendBarThroughput, optionsBarChart } = this.state

        return (
            <div>
                {/* card activeSubs for desktop */}
                <div className="card card-chart card-info">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-2 paddingLeftCardIcon">
                                <FontAwesomeIcon icon={faUser} className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10 cardTitle-label-container">
                                <div className="cardTitle-label ">
                                    <h4 className="card-title">Active Subcribers per Minute</h4>
                                    <p className="noMargin">Number of subcribers having active sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-lg-6 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Now</p>
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)}</span>

                                                </div>
                                            </div>
                                            <div className="col-lg-6 text-left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p className="cardBody-label">Today's Peak Minute</p>
                                                        {this.props.dataUsage.dataUsageActiveSubcriber.datasets[0].data.length > 0 ?
                                                            <span className="TotalNumber ">{this.findPeakActiveSub().toFixed(1)}</span>
                                                            :
                                                            <span className="TotalNumber ">0</span>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="upperBar">
                                    <Bar redraw
                                        ref={ref => (this.barLatency = ref)}
                                        data={this.props.dataUsage.dataUsageActiveSubcriber}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>

                            </div>

                        </div>
                        {/* <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                                                    </div> */}
                    </div>
                </div>

                {/* card activeSubs for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-md-12">
                                <PersonOutlineIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-md-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Active Subcribers per Minute</h4>
                                    <p>Number of subcribers having active sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Now</p>
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)}</span>

                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today's Peak Minute</p>
                                                        {this.props.dataUsage.dataUsageActiveSubcriber.datasets[0].data.length > 0 ?
                                                            <span className="TotalNumber ">{this.findPeakActiveSub().toFixed(1)}</span>
                                                            :
                                                            <span className="TotalNumber ">0</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="upperBar">
                                    <Bar redraw
                                        ref={ref => (this.barLatency = ref)}
                                        data={this.props.dataUsage.dataUsageActiveSubcriber}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>

                            </div>

                        </div>
                        {/* <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                                                    </div> */}
                    </div>
                </div>

                {/* card throughput for desktop */}
                <div className="card card-chart card-info">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-2 paddingLeftCardIcon">
                                <FontAwesomeIcon icon={faTachometerAlt} className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10 cardTitle-label-container">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Throughput</h4>
                                    <p className="noMargin">Throughput between subscribers and external servers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-lg-6 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Total </p>
                                                    <span className="TotalNumber">{this.props.dataUsage.dataUsageThroughput.totalUpDown + " " + this.props.dataUsage.dataUsageThroughput.labelsTotal[2]} </span>
                                                    <div className="legend-container">
                                                        <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                            {legendBarThroughput && legendBarThroughput.length &&
                                                                legendBarThroughput.map((item, key) => {
                                                                    return (
                                                                        <li key={key} >
                                                                            {/* <div
                                                                                style={{
                                                                                    display: "inline-block",
                                                                                    float: "left",
                                                                                    width: "20px",
                                                                                    height: "20px",
                                                                                    backgroundColor: item.fillStyle
                                                                                }}
                                                                            >

                                                                            </div> */}
                                                                            {key === 0 ?
                                                                                <span >{item.text + " " + this.props.dataUsage.dataUsageThroughput.totalUplink + " " + this.props.dataUsage.dataUsageThroughput.labelsTotal[key]} </span>
                                                                                :
                                                                                <span >{item.text + " " + this.props.dataUsage.dataUsageThroughput.totalDownlink + " " + this.props.dataUsage.dataUsageThroughput.labelsTotal[key]} </span>
                                                                            }

                                                                        </li>
                                                                    );
                                                                })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 text-left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-12">
                                <div className="upperBar">
                                    <Bar
                                        redraw
                                        ref={ref => (this.barThroughput = ref)}
                                        data={this.props.dataUsage.dataUsageThroughput}
                                        options={this.props.optionsBarToNegativeNumbThroughtPut}
                                    />
                                </div>

                            </div>

                        </div>
                        {/* <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                                                    </div> */}
                    </div>
                </div>
                {/* card throughput for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-12">
                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Throughput</h4>
                                    <p>Throughput between subscribers and external servers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-lg-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Total </p>
                                                    <span className="TotalNumber">{this.props.dataUsage.dataUsageThroughput.totalUpDown + " " + this.props.dataUsage.dataUsageThroughput.labelsTotal[2]} </span>
                                                    <div className="legend-container">
                                                        <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                            {legendBarThroughput && legendBarThroughput.length &&
                                                                legendBarThroughput.map((item, key) => {
                                                                    return (
                                                                        <li key={key} >
                                                                            {/* <div
                                                                                style={{
                                                                                    display: "inline-block",
                                                                                    float: "left",
                                                                                    width: "20px",
                                                                                    height: "20px",
                                                                                    backgroundColor: item.fillStyle
                                                                                }}
                                                                            >

                                                                            </div> */}
                                                                            {key === 0 ?
                                                                                <span >{item.text + " " + this.props.dataUsage.dataUsageThroughput.totalUplink + " " + this.props.dataUsage.dataUsageThroughput.labelsTotal[key]} </span>
                                                                                :
                                                                                <span >{item.text + " " + this.props.dataUsage.dataUsageThroughput.totalDownlink + " " + this.props.dataUsage.dataUsageThroughput.labelsTotal[key]} </span>
                                                                            }

                                                                        </li>
                                                                    );
                                                                })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-12">
                                <div className="upperBar">
                                    <Bar
                                        redraw
                                        ref={ref => (this.barLatency = ref)}
                                        data={this.props.dataUsage.dataUsageThroughput}
                                        options={this.props.optionsBarToNegativeNumbThroughtPut}
                                    />
                                </div>

                            </div>

                        </div>
                        {/* <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                                                    </div> */}
                    </div>
                </div>

                {/* card volume for desktop */}
                <div className="card card-chart card-info">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-2 paddingLeftCardIcon">

                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10 cardTitle-label-container">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">VOLUME</h4>
                                    <p className="noMargin">Total payload traffic generated by all subcribers</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="chart-container">
                                    <Doughnut
                                        redraw
                                        ref={ref => (this.doughnutVolume = ref)}
                                        data={this.props.dataUsage.dataUsageVolume}
                                        options={this.props.optionsDoughVolume}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-8 ">
                                <div className="row">
                                    <div className="col-lg-5 text-left noPadding">
                                        <div className="setToCenter">
                                            <div className="legend-container">
                                                <div className="ct-chart" id="dailySalesChart">
                                                    <p className="cardBody-label">Total</p>
                                                    <span className="TotalNumber">{this.props.dataUsage.dataUsageVolume.totalDataVolume + " " + this.props.dataUsage.dataUsageVolume.labelData[2]}</span>
                                                    <div className="legend-container">
                                                        <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                            {legendDoughnutVolume && legendDoughnutVolume.length &&
                                                                legendDoughnutVolume.map((item, key) => {
                                                                    return (
                                                                        <li key={key} >
                                                                            <div
                                                                                style={{
                                                                                    display: "inline-block",
                                                                                    float: "left",
                                                                                    width: "20px",
                                                                                    height: "20px",
                                                                                    backgroundColor: item.fillStyle
                                                                                }}
                                                                            >

                                                                            </div>
                                                                            <span className="legendLabel">{item.text}</span>
                                                                            {item.text === "Uplink" ?
                                                                                <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[0] + " " + this.props.dataUsage.dataUsageVolume.labelData[0]}</span>
                                                                                : <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[1] + " " + this.props.dataUsage.dataUsageVolume.labelData[1]}</span>

                                                                            }
                                                                        </li>
                                                                    );
                                                                })}
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 text-left noPadding">
                                        <div className="setToCenter">

                                            <div className="volumePerSub-container">
                                                <p className="cardBody-label">Average Volume per Subscriber</p>
                                                <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} MB</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                {/* card volume for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-md-12">

                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-md-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">VOLUME</h4>
                                    <p style={{ margin: 0 }}>Total payload traffic generated by all subcribers</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="chart-container">
                                    <Doughnut
                                        redraw
                                        ref={ref => (this.doughnutVolume = ref)}
                                        data={this.props.dataUsage.dataUsageVolume}
                                        options={this.props.optionsDoughVolume}
                                    />
                                </div>
                            </div>


                            <div className="col-md-12  ">
                                <div className="row">
                                    <div className="card-info-mobile-item">
                                        <div className="col-lg-12 ">
                                            <div className="setToCenter">
                                                <div className="legend-container">
                                                    <div className="ct-chart" id="dailySalesChart">
                                                        <p className="cardBody-label">Total</p>
                                                        <span className="TotalNumber">{this.props.dataUsage.dataUsageVolume.totalDataVolume + " " + this.props.dataUsage.dataUsageVolume.labelData[2]}</span>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-info-mobile-item">
                                        <div className="col-md-12 ">
                                            <div className="setToCenter">
                                                <div className="volumePerSub-container">
                                                    <p style={{ margin: "0" }}>Average Volume per Subscriber</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 ">
                                            <div className="setToCenter">
                                                <div className="volumePerSub-container">
                                                    <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} MB</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 ">
                                        <div className="setToCenter">
                                            <div className="legend-container">
                                                <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                    {legendDoughnutVolume && legendDoughnutVolume.length &&
                                                        legendDoughnutVolume.map((item, key) => {
                                                            return (
                                                                <li key={key} >
                                                                    <div
                                                                        style={{
                                                                            display: "inline-block",
                                                                            float: "left",
                                                                            width: "20px",
                                                                            height: "20px",
                                                                            backgroundColor: item.fillStyle
                                                                        }}
                                                                    >

                                                                    </div>
                                                                    <span className="legendLabel">{item.text}</span>
                                                                    {item.text === "Uplink" ?
                                                                        <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[0] + " " + this.props.dataUsage.dataUsageVolume.labelData[0]}</span>
                                                                        : <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[1] + " " + this.props.dataUsage.dataUsageVolume.labelData[1]}</span>

                                                                    }
                                                                </li>
                                                            );
                                                        })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>


                {/* <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                                                    </div> */}

            </div>
        )
    }
}
