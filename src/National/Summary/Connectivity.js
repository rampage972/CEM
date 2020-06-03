import React, { Component } from "react";

import { Doughnut, Bar } from "react-chartjs-2";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faHourglassHalf, faCircle } from '@fortawesome/free-solid-svg-icons'
import DataUsageIcon from "@material-ui/icons/DataUsage";
export default class Connectivity extends Component {
    constructor() {
        super();
        this.state = {
            legendDoughnutVolume: [],
            legendBarLatency: [],
            dataConnect: {},
            dataConnectLatency: [],
            dataConnectPacketLoss: []
        };
    }
    componentDidMount = () => {

        if (this.doughnutVolume) {
            this.setState({
                legendDoughnutVolume: this.doughnutVolume.chartInstance.legend.legendItems,
            });
        }
        this.barLatency &&
            this.setState({
                legendBarLatency: this.barLatency.chartInstance.legend.legendItems,
            });
    };
    upperFirstCase = (data) => {
        return data.charAt(0).toUpperCase() + data.substring(1);
    }
    render() {
        const { dataConnect, dataTotalConnect, typeOfDay, currentSummary } = this.props;
        const { legendBarLatency } = this.state
        return (
            <div className={currentSummary === 2 ? "row" : ""}>
                {/* card Package Loss for desktop */}
                <div className={currentSummary === 2 ? "col-lg-7" : ""}>
                    <div className="card card-chart card-info">
                        <div className="card-header ">
                            <div className="row">
                                <div className="col-lg-2 paddingLeftCardIcon">
                                    <FontAwesomeIcon icon={faHourglassHalf} className="cardTitle-Icon" />
                                </div>
                                <div className="col-lg-10 cardTitle-label-container">
                                    <div className="cardTitle-label">
                                        <h4 className="card-title">Package Loss</h4>
                                        <p className="noMargin cardTitle-label-detail">
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
                                                <div className="col-lg-12 text-left">
                                                    <div className="row">

                                                        {legendBarLatency && legendBarLatency.length &&
                                                            legendBarLatency.map((item, key) => {
                                                                return (
                                                                    <div className="col-lg-6 content-middle" key={key} >
                                                                        {key === 0 ?
                                                                            <div className="setToCenter">
                                                                                <p>{"Total internal"} </p>
                                                                                {dataTotalConnect.dataConnectPacketLoss.internal ?
                                                                                    <p>{dataTotalConnect.dataConnectPacketLoss.internal + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                            :
                                                                            <div className="setToCenter">
                                                                                <p>{"Peak internal by " + this.upperFirstCase(typeOfDay)} </p>
                                                                                {dataConnect.dataConnectPacketLoss.dataPeak.internal ?
                                                                                    <p>{dataConnect.dataConnectPacketLoss.dataPeak.internal + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                );
                                                            })}


                                                    </div>
                                                </div>
                                                <div className="col-lg-6 text-left">

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                                {/* <div className="col-lg-4 " style={{ justifyContent: "left", alignItems: " flex-end", paddingBottom: "10px", paddingLeft: "4em" }}>
                                
                            </div> */}
                                <div className="col-lg-12">
                                    <div className="upperBar">
                                        <div className="row">
                                            <div className="col-lg-6"></div>
                                            <div className="col-lg-6">
                                                {legendBarLatency && legendBarLatency.length
                                                    && legendBarLatency.map((item, key) => {
                                                        return (
                                                            <div key={key} className="content-middle" style={{ justifyContent: "flex-end" }}>
                                                                <div
                                                                    style={{
                                                                        display: "inline-block",
                                                                        float: "left",
                                                                        width: "20px",
                                                                        height: "10px",
                                                                        backgroundColor: item.fillStyle
                                                                    }}
                                                                >
                                                                </div>
                                                                {key == 0 ?
                                                                    <span className="cardBody-label" style={{ fontSize: "10px", paddingLeft: "3px" }}>Internal </span>
                                                                    : <span className="cardBody-label" style={{ fontSize: "10px", paddingLeft: "3px" }}>External </span>
                                                                }
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="upperBar">
                                                    <Bar
                                                        redraw
                                                        height={currentSummary === 2 ? 125 : 100}
                                                        ref={ref => (this.barLatency = ref)}
                                                        data={dataConnect.dataConnectPacketLoss}
                                                        options={this.props.optionsBarToNegativeNumb}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-12">
                                    <div className="legend-container">
                                        <div className="ct-chart" id="dailySalesChart">
                                            <div className="row">
                                                <div className="col-lg-12 text-left">
                                                    <div className="row">

                                                        {/* <span className="TotalNumber">{dataTotalConnect.dataConnectLatency + " " + dataTotalUsage.dataUsageThroughput.labelTotalUpDown + "%"} </span> */}

                                                        {legendBarLatency && legendBarLatency.length &&
                                                            legendBarLatency.map((item, key) => {
                                                                return (
                                                                    <div className="col-lg-6 content-middle" key={key} >
                                                                        {key === 0 ?
                                                                            <div className="setToCenter">
                                                                                <p>{"Total external"} </p>
                                                                                {dataTotalConnect.dataConnectPacketLoss.external ?
                                                                                    <p>{dataTotalConnect.dataConnectPacketLoss.external + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                            :
                                                                            <div className="setToCenter">
                                                                                <p>{"Peak external by " + this.upperFirstCase(typeOfDay)} </p>
                                                                                {dataConnect.dataConnectPacketLoss.dataPeak.external ?
                                                                                    <p>{dataConnect.dataConnectPacketLoss.dataPeak.external + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                );
                                                            })}


                                                    </div>
                                                </div>
                                                <div className="col-lg-6 text-left">

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {/* card Package Loss for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-md-12">
                                <FontAwesomeIcon icon={faHourglassHalf} className="cardTitle-Icon cardTitle-Icon-mobile" />
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

                            <div className="col-sm-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-sm-12 text-left">
                                                <div className="row">

                                                    {legendBarLatency && legendBarLatency.length &&
                                                        legendBarLatency.map((item, key) => {
                                                            return (
                                                                <div className="col-sm-6" key={key} >
                                                                    {key === 0 ?
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Total internal"} </p>
                                                                            {dataTotalConnect.dataConnectPacketLoss.internal ?
                                                                                <p>{dataTotalConnect.dataConnectPacketLoss.internal + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                : <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                            }
                                                                        </div>
                                                                        :
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Peak internal by " + this.upperFirstCase(typeOfDay)} </p>
                                                                            {dataConnect.dataConnectPacketLoss.dataPeak.internal ?
                                                                                <p>{dataConnect.dataConnectPacketLoss.dataPeak.internal + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                :
                                                                                <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                            }
                                                                        </div>
                                                                    }

                                                                </div>
                                                            );
                                                        })}


                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-left">

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                            {/* <div className="col-sm-4 " style={{ justifyContent: "left", alignItems: " flex-end", paddingBottom: "10px", paddingLeft: "4em" }}>
                                
                            </div> */}
                            <div className="col-sm-12">
                                <div className="upperBar">
                                    <div className="row">
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-6">
                                            {legendBarLatency && legendBarLatency.length
                                                && legendBarLatency.map((item, key) => {
                                                    return (
                                                        <div key={key} className="content-middle" style={{ justifyContent: "flex-end" }}>
                                                            <div
                                                                style={{
                                                                    display: "inline-block",
                                                                    float: "left",
                                                                    width: "20px",
                                                                    height: "10px",
                                                                    backgroundColor: item.fillStyle
                                                                }}
                                                            >
                                                            </div>
                                                            {key == 0 ?
                                                                <span className="cardBody-label" style={{ fontSize: "10px", paddingLeft: "3px" }}>Internal </span>
                                                                : <span className="cardBody-label" style={{ fontSize: "10px", paddingLeft: "3px" }}>External </span>
                                                            }
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="upperBar">
                                                <Bar
                                                    redraw
                                                    ref={ref => (this.barLatency = ref)}
                                                    data={dataConnect.dataConnectPacketLoss}
                                                    options={this.props.optionsBarToNegativeNumb}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-sm-12 text-left">
                                                <div className="row">

                                                    {/* <span className="TotalNumber">{dataTotalConnect.dataConnectLatency + " " + dataTotalUsage.dataUsageThroughput.labelTotalUpDown + "%"} </span> */}

                                                    {legendBarLatency && legendBarLatency.length &&
                                                        legendBarLatency.map((item, key) => {
                                                            return (
                                                                <div className="col-sm-6" key={key} >
                                                                    {key === 0 ?
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Total external"} </p>
                                                                            {dataTotalConnect.dataConnectPacketLoss.external ?
                                                                                <p>{dataTotalConnect.dataConnectPacketLoss.external + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                : <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>

                                                                            }
                                                                        </div>
                                                                        :
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Peak external by " + this.upperFirstCase(typeOfDay)} </p>
                                                                            {dataConnect.dataConnectPacketLoss.dataPeak.external ?
                                                                                <p>{dataConnect.dataConnectPacketLoss.dataPeak.external + " %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                :
                                                                                <p>{"0 %"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                            }
                                                                        </div>
                                                                    }

                                                                </div>
                                                            );
                                                        })}


                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-left">

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                {/* card Latency for desktop */}
                <div className={currentSummary === 2 ? "col-lg-5" : ""}>
                    <div className="card card-chart card-info">
                        <div className="card-header ">
                            <div className="row">
                                <div className="col-lg-2 paddingLeftCardIcon">
                                    <FontAwesomeIcon icon={faHistory} className="cardTitle-Icon" />
                                </div>
                                <div className="col-lg-10  cardTitle-label-container">
                                    <div className="cardTitle-label">
                                        <h4 className="card-title">Latency</h4>
                                        <p className="noMargin cardTitle-label-detail">TCP handshake based latency</p>
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
                                                <div className="col-lg-12 text-left">
                                                    <div className="row">

                                                        {/* <span className="TotalNumber">{dataTotalConnect.dataConnectLatency + " " + dataTotalUsage.dataUsageThroughput.labelTotalUpDown + "%"} </span> */}

                                                        {legendBarLatency && legendBarLatency.length &&
                                                            legendBarLatency.map((item, key) => {
                                                                return (
                                                                    <div className="col-lg-6 content-middle" key={key} >
                                                                        {key === 0 ?
                                                                            <div className="setToCenter">
                                                                                <p>{"Total internal"} </p>
                                                                                {dataTotalConnect.dataConnectLatency.internal ?
                                                                                    <p>{dataTotalConnect.dataConnectLatency.internal + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                            :
                                                                            <div className="setToCenter">
                                                                                <p>{"Peak internal by " + this.upperFirstCase(typeOfDay)} </p>
                                                                                {dataConnect.dataConnectLatency.dataPeak.internal ?
                                                                                    <p>{dataConnect.dataConnectLatency.dataPeak.internal + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                );
                                                            })}


                                                    </div>
                                                </div>
                                                <div className="col-lg-6 text-left">

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-12">
                                    <div className="upperBar">
                                        <div className="row">
                                            <div className="col-lg-6"></div>
                                            <div className="col-lg-6">
                                                {legendBarLatency && legendBarLatency.length
                                                    && legendBarLatency.map((item, key) => {
                                                        return (
                                                            <div key={key} className="content-middle" style={{ justifyContent: "flex-end" }}>
                                                                <div
                                                                    style={{
                                                                        display: "inline-block",
                                                                        float: "left",
                                                                        width: "20px",
                                                                        height: "10px",
                                                                        backgroundColor: item.fillStyle
                                                                    }}
                                                                >
                                                                </div>
                                                                {key == 0 ?
                                                                    <span className="cardBody-label" style={{ fontSize: "10px", paddingLeft: "3px" }}>Internal </span>
                                                                    : <span className="cardBody-label" style={{ fontSize: "10px", paddingLeft: "3px" }}>External </span>
                                                                }
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="upperBar">
                                                    <Bar
                                                        redraw
                                                        height={currentSummary === 2 ? 125 : 100}
                                                        ref={ref => (this.barThroughput = ref)}
                                                        data={dataConnect.dataConnectLatency}
                                                        options={this.props.optionsBarToNegativeNumb}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-12">
                                    <div className="legend-container">
                                        <div className="ct-chart" id="dailySalesChart">
                                            <div className="row">
                                                <div className="col-lg-12 text-left">
                                                    <div className="row">

                                                        {/* <span className="TotalNumber">{dataTotalConnect.dataConnectLatency + " " + dataTotalUsage.dataUsageThroughput.labelTotalUpDown + "%"} </span> */}

                                                        {legendBarLatency && legendBarLatency.length &&
                                                            legendBarLatency.map((item, key) => {
                                                                return (
                                                                    <div className="col-lg-6 content-middle" key={key} >
                                                                        {key === 0 ?
                                                                            <div className="setToCenter">
                                                                                <p>{"Total external"} </p>
                                                                                {dataTotalConnect.dataConnectLatency.external ?
                                                                                    <p>{dataTotalConnect.dataConnectLatency.external + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                            :
                                                                            <div className="setToCenter">
                                                                                <p>{"Peak external by " + this.upperFirstCase(typeOfDay)} </p>
                                                                                {dataConnect.dataConnectLatency.dataPeak.external ?
                                                                                    <p>{dataConnect.dataConnectLatency.dataPeak.external + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                    : <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                }
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                );
                                                            })}


                                                    </div>
                                                </div>
                                                <div className="col-lg-6 text-left">

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {/* card Latency for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-sm-12">
                                <FontAwesomeIcon icon={faHistory} className="cardTitle-Icon cardTitle-Icon-mobile" />
                            </div>
                            <div className="col-sm-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Latency</h4>
                                    <p>TCP handshake based latency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-sm-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-sm-12 text-left">
                                                <div className="row">

                                                    {legendBarLatency && legendBarLatency.length &&
                                                        legendBarLatency.map((item, key) => {
                                                            return (
                                                                <div className="col-sm-6" key={key} >
                                                                    {key === 0 ?
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Total internal"} </p>
                                                                            {dataTotalConnect.dataConnectLatency.internal ?
                                                                                <p>{dataTotalConnect.dataConnectLatency.internal + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                : <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                            }
                                                                        </div>
                                                                        :
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Peak internal by " + this.upperFirstCase(typeOfDay)} </p>
                                                                            {dataConnect.dataConnectLatency.dataPeak.internal ?
                                                                                <p>{dataConnect.dataConnectLatency.dataPeak.internal + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                :
                                                                                <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                            }
                                                                        </div>
                                                                    }

                                                                </div>
                                                            );
                                                        })}


                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-left">

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                            {/* <div className="col-sm-4 " style={{ justifyContent: "left", alignItems: " flex-end", paddingBottom: "10px", paddingLeft: "4em" }}>
                                
                            </div> */}
                            <div className="col-sm-12">
                                <div className="upperBar">
                                    <div className="row">
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-6">
                                            {legendBarLatency && legendBarLatency.length
                                                && legendBarLatency.map((item, key) => {
                                                    return (
                                                        <div key={key} className="content-middle" style={{ justifyContent: "flex-end" }}>
                                                            <div
                                                                style={{
                                                                    display: "inline-block",
                                                                    float: "left",
                                                                    width: "20px",
                                                                    height: "10px",
                                                                    backgroundColor: item.fillStyle
                                                                }}
                                                            >
                                                            </div>
                                                            <span className="cardBody-label" style={{ fontSize: "10px", paddingLeft: "3px" }}>Internal </span>
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="upperBar">
                                                <Bar
                                                    redraw
                                                    ref={ref => (this.barLatency = ref)}
                                                    data={dataConnect.dataConnectLatency}
                                                    options={this.props.optionsBarToNegativeNumb}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-sm-12 text-left">
                                                <div className="row">

                                                    {/* <span className="TotalNumber">{dataTotalConnect.dataConnectLatency + " " + dataTotalUsage.dataUsageThroughput.labelTotalUpDown + "%"} </span> */}

                                                    {legendBarLatency && legendBarLatency.length &&
                                                        legendBarLatency.map((item, key) => {
                                                            return (
                                                                <div className="col-sm-6" key={key} >
                                                                    {key === 0 ?
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Total external"} </p>
                                                                            {dataTotalConnect.dataConnectLatency.external ?
                                                                                <p>{dataTotalConnect.dataConnectLatency.external + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                : <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>

                                                                            }
                                                                        </div>
                                                                        :
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <p>{"Peak external by " + this.upperFirstCase(typeOfDay)} </p>
                                                                            {dataConnect.dataConnectLatency.dataPeak.external ?
                                                                                <p>{dataConnect.dataConnectLatency.dataPeak.external + " ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                                :
                                                                                <p>{"0 ms"} <FontAwesomeIcon className="activeSignLatency" icon={faCircle} /></p>
                                                                            }
                                                                        </div>
                                                                    }

                                                                </div>
                                                            );
                                                        })}


                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-left">

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
