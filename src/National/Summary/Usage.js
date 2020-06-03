import React, { Component } from 'react'

import { Doughnut, Bar } from 'react-chartjs-2'
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
    upperFirstCase = (data) => {
        return data.charAt(0).toUpperCase() + data.substring(1);
    }
    render() {
        const { legendDoughnutVolume, legendBarThroughput } = this.state
        const { dataUsage, typeOfDay, dataTotalUsage, currentSummary } = this.props
        return (
            <div className={currentSummary === 1 ? "row" : ""}>
                {/* card throughput for desktop */}
                <div className={currentSummary === 1 ? "col-lg-8" : ""}>
                    <div className="card card-chart card-info">
                        <div className="card-header ">
                            <div className="row">
                                <div className="col-lg-2 paddingLeftCardIcon">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="cardTitle-Icon" />
                                </div>
                                <div className="col-lg-10 cardTitle-label-container">
                                    <div className="cardTitle-label">
                                        <h4 className="card-title">Throughput</h4>
                                        <p className="noMargin cardTitle-label-detail">Throughput between subscribers and external servers</p>
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
                                                <div className="col-lg-6 text-left content-middle">
                                                    <div className="setToCenter">
                                                        <p >Total </p>
                                                        {dataTotalUsage.dataUsageThroughput.totalUpDown ?
                                                            <span className="TotalNumber">{dataTotalUsage.dataUsageThroughput.totalUpDown + " " + dataTotalUsage.dataUsageThroughput.labelTotalUpDown + "/s"} </span>
                                                            : <span className="TotalNumber">{"0 bit/s"} </span>
                                                        }
                                                        <div className="legend-container">
                                                            <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                                {legendBarThroughput && legendBarThroughput.length &&
                                                                    legendBarThroughput.map((item, key) => {
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
                                                                                {key === 0 ?
                                                                                    dataTotalUsage.dataUsageThroughput.totalUpLink ?
                                                                                        <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataTotalUsage.dataUsageThroughput.totalUpLink + " " + dataTotalUsage.dataUsageThroughput.labelUpLink + "/s"} </span>
                                                                                        : <span style={{ paddingLeft: "3px" }}>{item.text + " 0 bit/s"} </span>
                                                                                    : dataTotalUsage.dataUsageThroughput.totalDownLink ?
                                                                                        <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataTotalUsage.dataUsageThroughput.totalDownLink + " " + dataTotalUsage.dataUsageThroughput.labelDownLink + "/s"} </span>
                                                                                        : <span style={{ paddingLeft: "3px" }}>{item.text + " 0 bit/s"} </span>
                                                                                }

                                                                            </li>
                                                                        );
                                                                    })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 text-left content-middle">
                                                    <div className="setToCenter">
                                                        <p >Peak {this.upperFirstCase(typeOfDay)} </p>
                                                        {dataUsage.dataUsageThroughput.dataPeak.totalUpDown ?
                                                            <span className="TotalNumber">{dataUsage.dataUsageThroughput.dataPeak.totalUpDown + " " + dataUsage.dataUsageThroughput.dataPeak.label[2] + "/s"} </span>
                                                            : <span className="TotalNumber">{"0 bit/s"} </span>
                                                        }
                                                        <div className="legend-container">
                                                            <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                                {legendBarThroughput && legendBarThroughput.length &&
                                                                    legendBarThroughput.map((item, key) => {
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
                                                                                {key === 0 ?
                                                                                    dataUsage.dataUsageThroughput.dataPeak.uplink ?
                                                                                        <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataUsage.dataUsageThroughput.dataPeak.uplink + " " + dataUsage.dataUsageThroughput.dataPeak.label[0] + "/s"} </span>
                                                                                        : <span style={{ paddingLeft: "3px" }}>{item.text + " " + "0 bit/s"} </span>
                                                                                    : dataUsage.dataUsageThroughput.dataPeak.downlink ?
                                                                                        <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataUsage.dataUsageThroughput.dataPeak.downlink + " " + dataUsage.dataUsageThroughput.dataPeak.label[1] + "/s"} </span>
                                                                                        : <span style={{ paddingLeft: "3px" }}>{item.text + " " + "0 bit/s"} </span>
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
                                            height={currentSummary === 1 ? 100 : 100}
                                            ref={ref => (this.barThroughput = ref)}
                                            data={dataUsage.dataUsageThroughput}
                                            options={this.props.optionsBarToNegativeNumbThroughtPut}
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* card throughput for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-sm-12">
                                <FontAwesomeIcon icon={faTachometerAlt} className="cardTitle-Icon cardTitle-Icon-mobile" />
                            </div>
                            <div className="col-sm-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Throughput</h4>
                                    <p>Throughput between subscribers and external servers</p>
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
                                            <div className="col-sm-12">
                                                <div className="setToCenter">
                                                    <p >Total </p>
                                                    {dataTotalUsage.dataUsageThroughput.totalUpDown ?
                                                        <span className="TotalNumber">{dataTotalUsage.dataUsageThroughput.totalUpDown + " " + dataTotalUsage.dataUsageThroughput.labelTotalUpDown + "/s"} </span>
                                                        : <span className="TotalNumber">{"0 bit/s"} </span>
                                                    }
                                                    <div className="legend-container legend-container-mobile">
                                                        <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                            {legendBarThroughput && legendBarThroughput.length &&
                                                                legendBarThroughput.map((item, key) => {
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
                                                                            {key === 0 ?
                                                                                dataTotalUsage.dataUsageThroughput.totalUpLink ?
                                                                                    <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataTotalUsage.dataUsageThroughput.totalUpLink + " " + dataTotalUsage.dataUsageThroughput.labelUpLink + "/s"} </span>
                                                                                    : <span style={{ paddingLeft: "3px" }}>{item.text + " 0 bit/s"} </span>
                                                                                : dataTotalUsage.dataUsageThroughput.totalDownLink ?
                                                                                    <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataTotalUsage.dataUsageThroughput.totalDownLink + " " + dataTotalUsage.dataUsageThroughput.labelDownLink + "/s"} </span>
                                                                                    : <span style={{ paddingLeft: "3px" }}>{item.text + " 0 bit/s"} </span>
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
                            <div className="col-sm-12">
                                <div className="upperBar">
                                    <Bar
                                        redraw
                                        ref={ref => (this.barLatency = ref)}
                                        data={dataUsage.dataUsageThroughput}
                                        options={this.props.optionsBarToNegativeNumbThroughtPut}
                                    />
                                </div>

                            </div>
                            <div className="col-sm-12">
                                <div className="legend-container">
                                    <div className="ct-chart" id="dailySalesChart">
                                        <div className="row">
                                            <div className="col-sm-12 ">
                                                <div className="setToCenter">
                                                    <p >Peak {this.upperFirstCase(typeOfDay)} </p>
                                                    {dataUsage.dataUsageThroughput.dataPeak.totalUpDown ?
                                                        <span className="TotalNumber">{dataUsage.dataUsageThroughput.dataPeak.totalUpDown + " " + dataUsage.dataUsageThroughput.dataPeak.label[2] + "/s"} </span>
                                                        : <span className="TotalNumber">{"0 bit/s"} </span>
                                                    }
                                                    <div className="legend-container legend-container-mobile">
                                                        <ul className="mt-8" type="none" style={{ padding: "0" }}>
                                                            {legendBarThroughput && legendBarThroughput.length &&
                                                                legendBarThroughput.map((item, key) => {
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
                                                                            {key === 0 ?
                                                                                dataUsage.dataUsageThroughput.dataPeak.uplink ?
                                                                                    <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataUsage.dataUsageThroughput.dataPeak.uplink + " " + dataUsage.dataUsageThroughput.dataPeak.label[0] + "/s"} </span>
                                                                                    : <span style={{ paddingLeft: "3px" }}>{item.text + " " + "0 bit/s"} </span>
                                                                                : dataUsage.dataUsageThroughput.dataPeak.downlink ?
                                                                                    <span style={{ paddingLeft: "3px" }}>{item.text + " " + dataUsage.dataUsageThroughput.dataPeak.downlink + " " + dataUsage.dataUsageThroughput.dataPeak.label[1] + "/s"} </span>
                                                                                    : <span style={{ paddingLeft: "3px" }}>{item.text + " " + "0 bit/s"} </span>
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

                    </div>
                </div>

                {/* card activeSubs for desktop */}
                <div className={currentSummary === 1 ? "col-lg-4" : ""}>

                    <div className="card card-chart card-info">
                        <div className="card-header ">
                            <div className="row">
                                <div className="col-lg-2 paddingLeftCardIcon">
                                    <FontAwesomeIcon icon={faUser} className="cardTitle-Icon" />
                                </div>
                                <div className="col-lg-10 cardTitle-label-container">
                                    <div className="cardTitle-label ">
                                        <h4 className="card-title">Active Subcribers</h4>
                                        <p className="noMargin cardTitle-label-detail">Number of subcribers having active sessions</p>
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
                                                <div className="col-lg-6 text-left content-middle">
                                                    <div className="setToCenter">
                                                        <p >Total</p>
                                                        <span className="TotalNumber">{dataTotalUsage.dataUsageActiveSubcriber.distinct_msisdn ? Math.floor(dataTotalUsage.dataUsageActiveSubcriber.distinct_msisdn).toLocaleString('ja-JP') : 0}</span>

                                                    </div>
                                                </div>
                                                <div className="col-lg-6 text-left content-middle">
                                                    <div className="setToCenter">
                                                        <div className="volumePerSub-container">
                                                            <p >Peak {this.upperFirstCase(typeOfDay)}</p>
                                                            {dataUsage.dataUsageActiveSubcriber.datasets[0].data.length > 0 ?
                                                                <span className="TotalNumber ">{(this.findPeakActiveSub()).toLocaleString('ja-JP')}</span>
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
                                            height={currentSummary === 1 ? 125 : 100}
                                            ref={ref => (this.barLatency = ref)}
                                            data={dataUsage.dataUsageActiveSubcriber}
                                            options={this.props.optionsBarToNegativeNumb}
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* card activeSubs for mobile */}
                <div className="card card-chart card-info-mobile">
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-sm-12">
                                <FontAwesomeIcon icon={faUser} className="cardTitle-Icon cardTitle-Icon-mobile" />
                            </div>
                            <div className="col-sm-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">Active Subcribers</h4>
                                    <p>Number of subcribers having active sessions</p>
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
                                            <div className="col-sm-6 content-middle">
                                                <div className="setToCenter">
                                                    <p style={{ margin: "0" }}>Total</p>
                                                    <span className="TotalNumber">{dataTotalUsage.dataUsageActiveSubcriber.distinct_msisdn ? Math.floor(dataTotalUsage.dataUsageActiveSubcriber.distinct_msisdn).toLocaleString('ja-JP') : 0}</span>

                                                </div>
                                            </div>
                                            <div className="col-sm-6 content-middle">
                                                <div className="setToCenter">
                                                    <div className="volumePerSub-container">
                                                        <p style={{ margin: "0" }}>Peak {this.upperFirstCase(typeOfDay)}</p>
                                                        {dataUsage.dataUsageActiveSubcriber.datasets[0].data.length > 0 ?
                                                            <span className="TotalNumber ">{(this.findPeakActiveSub()).toLocaleString('ja-JP')}</span>
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
                            <div className="col-sm-12">
                                <div className="upperBar">
                                    <Bar redraw
                                        ref={ref => (this.barLatency = ref)}
                                        data={dataUsage.dataUsageActiveSubcriber}
                                        options={this.props.optionsBarToNegativeNumb}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* card volume for desktop */}
                <div className={currentSummary === 1 ? "col-lg-7" : ""}>
                    <div className="card card-chart card-info">
                        <div className="card-header ">
                            <div className="row">
                                <div className="col-lg-2 paddingLeftCardIcon">

                                    <DataUsageIcon className="cardTitle-Icon" />
                                </div>
                                <div className="col-lg-10 cardTitle-label-container">
                                    <div className="cardTitle-label">
                                        <h4 className="card-title">VOLUME</h4>
                                        <p className="noMargin cardTitle-label-detail">Total payload traffic generated by all subcribers</p>
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
                                            data={dataUsage.dataUsageVolume}
                                            options={this.props.optionsDoughVolume}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-8 ">
                                    <div className="row">
                                        <div className="col-lg-6 text-left content-middle noPadding">
                                            <div className="setToCenter">
                                                <div className="legend-container">
                                                    <div className="ct-chart" id="dailySalesChart">
                                                        <p className="cardBody-label">Total</p>
                                                        {dataUsage.dataUsageVolume.dataTranfer.totalUpDown ?
                                                            <span className="TotalNumber">{dataUsage.dataUsageVolume.dataTranfer.totalUpDown + " " + dataUsage.dataUsageVolume.dataTranfer.label[2]}</span>
                                                            : <span className="TotalNumber">{"0 byte"}</span>
                                                        }
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
                                                                                    dataUsage.dataUsageVolume.dataTranfer.uplink ?
                                                                                        <span style={{ fontWeight: "bold" }}> {dataUsage.dataUsageVolume.dataTranfer.uplink + " " + dataUsage.dataUsageVolume.dataTranfer.label[0]}</span>
                                                                                        : <span style={{ fontWeight: "bold" }}> 0 byte</span>
                                                                                    : dataUsage.dataUsageVolume.dataTranfer.downlink ?
                                                                                        <span style={{ fontWeight: "bold" }}> {dataUsage.dataUsageVolume.dataTranfer.downlink + " " + dataUsage.dataUsageVolume.dataTranfer.label[1]}</span>
                                                                                        : <span style={{ fontWeight: "bold" }}> 0 byte</span>

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
                                        <div className="col-lg-6 text-left content-middle " style={{alignItems:"unset"}}>
                                            <div >
                                                <div className="volumePerSub-container">
                                                    <p className="cardBody-label">Average Volume per Subscriber</p>
                                                    {dataUsage.dataUsageVolume.dataTranfer.average ?
                                                        <span className="TotalNumber ">{dataUsage.dataUsageVolume.dataTranfer.average + " " + dataUsage.dataUsageVolume.dataTranfer.label[3]}</span>
                                                        : <span className="TotalNumber ">{"0 byte"}</span>
                                                    }
                                                </div>
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
                            <div className="col-sm-12">

                                <DataUsageIcon className="cardTitle-Icon cardTitle-Icon-mobile" />
                            </div>
                            <div className="col-sm-12">
                                <div className="cardTitle-label">
                                    <h4 className="card-title">VOLUME</h4>
                                    <p style={{ margin: 0 }}>Total payload traffic generated by all subcribers</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="chart-container">
                                    <Doughnut
                                        redraw
                                        ref={ref => (this.doughnutVolume = ref)}
                                        data={dataUsage.dataUsageVolume}
                                        options={this.props.optionsDoughVolume}
                                    />
                                </div>
                            </div>


                            <div className="col-sm-12  ">
                                <div className="row pt-4">
                                    <div className="col-sm-6 ">
                                        <div className="setToCenter">
                                            <div className="legend-container">
                                                <div className="ct-chart" id="dailySalesChart">
                                                    <p className="cardBody-label">Total</p>
                                                    <span className="TotalNumber">{dataUsage.dataUsageVolume.dataTranfer.totalUpDown + " " + dataUsage.dataUsageVolume.dataTranfer.label[2]}</span>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 ">
                                        <div className="setToCenter">
                                            <div className="volumePerSub-container">
                                                <p className="cardBody-label">Average Volume per Subscriber</p>
                                                <span className="TotalNumber ">{dataUsage.dataUsageVolume.dataTranfer.average + " " + dataUsage.dataUsageVolume.dataTranfer.label[3]}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-sm-12 ">
                                        <div className="setToCenter">
                                            <div className="legend-container legend-container-mobile">
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
                                                                        <span style={{ fontWeight: "bold" }}> {dataUsage.dataUsageVolume.dataTranfer.uplink + " " + dataUsage.dataUsageVolume.dataTranfer.label[0]}</span>
                                                                        : <span style={{ fontWeight: "bold" }}> {dataUsage.dataUsageVolume.dataTranfer.downlink + " " + dataUsage.dataUsageVolume.dataTranfer.label[1]}</span>

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

            </div>
        )
    }
}
