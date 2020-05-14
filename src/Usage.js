import React, { Component } from 'react'

import { Doughnut, Bar } from 'react-chartjs-2'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DataUsageIcon from '@material-ui/icons/DataUsage';
export default class Usage extends Component {
    constructor() {
        super()
        this.state = {
            legendDoughnutVolume: [],
            legendBarLatency: [],
            fakedata: []
        }
    }
    componentDidMount = () => {

        if (this.doughnutVolume) {
            this.setState({ legendDoughnutVolume: this.doughnutVolume.chartInstance.legend.legendItems });
        }
        this.barLatency && this.setState({ legendBarLatency: this.barLatency.chartInstance.legend.legendItems });

    }
    render() {
        const { legendDoughnutVolume, legendBarLatency, optionsBarChart } = this.state

        return (
            <div>
                {/* card activeSubs for desktop */}
                <div className="card card-chart card-info">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-2">
                                <PersonOutlineIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10 cardTitle-lable-container">
                                <div className="cardTitle-lable ">
                                    <h4 className="card-title">Active Subcribers per Minute</h4>
                                    <p>Number of subcribers having active sessions</p>
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
                                            <div className="col-lg-6 textAlign-Left">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Now</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 textAlign-Left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today's Peak Minute</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 textAlign-Left">
                                                <div className="setToCenter">

                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 textAlign-Left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} %</span>
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
                                <div className="cardTitle-lable">
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
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>

                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today's Peak Minute</p>
                                                        <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} %</span>

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
                            <div className="col-lg-2">
                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10 cardTitle-lable-container">
                                <div className="cardTitle-lable">
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
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Now Extenal</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Extenal</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Extenal</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">

                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} %</span>
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
                                        ref={ref => (this.barLatency = ref)}
                                        data={this.props.dataUsage.dataUsageThroughput}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>

                            </div>

                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Now Intenal</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Intenal</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">

                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Intenal</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 textAlign-Left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} %</span>

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
                </div>
                {/* card throughput for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-12">
                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-12">
                                <div className="cardTitle-lable">
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
                                                    <p style={{ margin: "0" }}>Now Extenal</p>
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Extenal</p>
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 card-info-mobile-item">
                                                <div className="setToCenter">

                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Extenal</p>
                                                        <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} %</span>

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
                                        ref={ref => (this.barLatency = ref)}
                                        data={this.props.dataUsage.dataUsageThroughput}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>

                            </div>

                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-lg-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Now Intenal</p>
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Intenal</p>
                                                    <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} %</span>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 card-info-mobile-item">
                                                <div className="setToCenter">

                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Intenal</p>
                                                        <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} %</span>

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
                </div>

                {/* card volume for desktop */}
                <div className="card card-chart card-info">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-2">

                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10 cardTitle-lable-container">
                                <div className="cardTitle-lable">
                                    <h4 className="card-title">VOLUME</h4>
                                    <p>Total payload traffic generated by all subcribers</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-3">
                                <div className="chart-container">
                                    <Doughnut
                                        ref={ref => (this.doughnutVolume = ref)}
                                        data={this.props.dataUsage.dataUsageVolume}
                                        options={this.props.optionsDoughVolume}
                                    />
                                </div>
                            </div>


                            <div className="col-xl-9">
                                <div className="row">
                                    <div className="col-lg-5 textAlign-Left">
                                        <div className="setToCenter">
                                            <div className="legend-container">
                                                <div className="ct-chart" id="dailySalesChart">
                                                    <p style={{ margin: "0" }}>Today</p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 textAlign-Left">
                                        <div className="setToCenter">

                                            <div className="volumePerSub-container">
                                                <p style={{ margin: "0" }}>Average Volume per Subscriber</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-5 col-lg-12 textAlign-Left">
                                        <div className="setToCenter">
                                            <div className="legend-container">
                                                <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} TB</span>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-7 textAlign-Left">
                                        <div className="setToCenter">

                                            <div className="volumePerSub-container">
                                                <span className="TotalNumber ">{this.props.totalNumberVolume.toFixed(1)} MB</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-5 col-lg-12 textAlign-Left">
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
                                                                        <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[0]} TB</span>
                                                                        : <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[1]} TB</span>

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

                {/* card volume for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-md-12">

                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-md-12">
                                <div className="cardTitle-lable">
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
                                                        <span style={{ margin: "0" }}>Today</span>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 ">
                                            <div className="setToCenter">
                                                <div className="legend-container">
                                                    <div className="ct-chart" id="dailySalesChart">
                                                        <span className="TotalNumber">{this.props.totalNumberVolume.toFixed(1)} TB</span>

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
                                                                        <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[0]} TB</span>
                                                                        : <span style={{ fontWeight: "bold" }}> {this.props.dataUsage.dataUsageVolume.datasets[0].data[1]} TB</span>

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
