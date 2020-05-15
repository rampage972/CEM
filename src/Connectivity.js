import React, { Component } from "react";

import { Doughnut, Bar } from "react-chartjs-2";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory,faHourglassHalf} from '@fortawesome/free-solid-svg-icons'
import DataUsageIcon from "@material-ui/icons/DataUsage";
export default class Connectivity extends Component {
    constructor() {
        super();
        this.state = {
            legendDoughnutVolume: [],
            legendBarLatency: [],
        };
    }
    componentDidMount = () => {
        if (this.doughnutVolume) {
            this.setState({
                legendDoughnutVolume: this.doughnutVolume.chartInstance.legend
                    .legendItems,
            });
        }
        this.barLatency &&
            this.setState({
                legendBarLatency: this.barLatency.chartInstance.legend.legendItems,
            });
    };
    render() {
        const {
            legendDoughnutVolume,
            legendBarLatency,
            optionsBarChart,
        } = this.props;
        return (
            <div>
                {/* card Package Loss for desktop */}
                <div className="card card-chart card-info">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-2 paddingLeftCardIcon">
                            <FontAwesomeIcon icon={faHourglassHalf} className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10 cardTitle-label-container">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Package Loss</h4>
                                    <p className="noMargin">
                                        Estimated package loss calculated based on the TCP
                                        Retrasmissions
                  </p>
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
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Now Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Current Hour Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p className="cardBody-label">Today Extenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
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
                                        ref={(ref) => (this.barLatency = ref)}
                                        data={this.props.dataConnect.dataConnectPacketLoss}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Now Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Current Hour Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p className="cardBody-label">Today Intenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
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

                {/* card Package Loss for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-md-12">
                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-md-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Package Loss</h4>
                                    <p>
                                        Estimated package loss calculated based on the TCP
                                        Retrasmissions
                  </p>
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
                                                    <p style={{ margin: "0" }}>Now Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Extenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
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
                                        ref={(ref) => (this.barLatency = ref)}
                                        data={this.props.dataConnect.dataConnectPacketLoss}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Now Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Intenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
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

                {/* card Latency for desktop */}
                <div className="card card-chart card-info">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-lg-2 paddingLeftCardIcon">
                                <FontAwesomeIcon icon={faHistory} className="cardTitle-Icon" />
                            </div>
                            <div className="col-lg-10  cardTitle-label-container">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Latency</h4>
                                    <p className="noMargin">TCP handshake based latency</p>
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
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Now Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Current Hour Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p className="cardBody-label">Today Extenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
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
                                        ref={(ref) => (this.barLatency = ref)}
                                        data={this.props.dataConnect.dataConnectLatency}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Now Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <p className="cardBody-label">Current Hour Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-left">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p className="cardBody-label">Today Intenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
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

                {/* card Latency for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-md-12">
                                <DataUsageIcon className="cardTitle-Icon" />
                            </div>
                            <div className="col-md-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Latency</h4>
                                    <p>TCP handshake based latency</p>
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
                                                    <p style={{ margin: "0" }}>Now Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Extenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Extenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="upperBar">
                                    <Bar
                                        ref={(ref) => (this.barLatency = ref)}
                                        data={this.props.dataConnect.dataConnectLatency}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Now Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Current Hour Intenal</p>
                                                    <span className="TotalNumber">
                                                        {this.props.totalNumberVolume.toFixed(1)} %
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 card-info-mobile-item">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Today Intenal</p>
                                                        <span className="TotalNumber ">
                                                            {this.props.totalNumberVolume.toFixed(1)} %
                            </span>
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
            </div>
        );
    }
}
