import React, { Component } from 'react'
import Usage from './Usage'
import Connectivity from './Connectivity'
import ReactTooltip from 'react-tooltip'
import './Summary.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import Menu from '@material-ui/core/Menu';
import { callAPI } from '../../service'
import MenuItem from '@material-ui/core/MenuItem'
import ReactExport from "react-data-export"
import { CSVLink } from "react-csv"
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faFileExport } from '@fortawesome/free-solid-svg-icons'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Summary extends Component {
    constructor() {
        super()
        function parseIsoDatetime(dtstr) {
            var dt = dtstr.split(/[: T-]/).map(parseFloat);
            return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
        }
        this._isMounted = false
        this.state = {
            anchorEl: null,
            dataToExport: [],
            tmpActive_subscribers: [],
            tmpThroughput_uplink: [],
            tmpThroughput_downlink: [],
            tmpInt_packet_loss: [],
            tmpExt_packet_loss: [],
            tmpInt_latency: [],
            tmpExt_latency: [],
            tmpTime: [],
            tmpVolume: [],
            selectFileExport: false,
            currentExportType: "",
            isSettedRemaining: true,
            intervalId: 0,
            remainingTime: 60,
            defaultRemainingTime: 60,
            pauseInterval: false,
            delayShow: false,
            isSetInterval: false,
            spinnerTest: true,
            currentSummary: 0,
            typeofInterVal: "hour",
            startDate: parseIsoDatetime("2019-12-08T00:00:00.000Z"),
            endDate: parseIsoDatetime("2019-12-08T23:59:59.000Z"),
            currentWidth: 0,
            isSubMenuOpened: false,
            legendDoughnutVolume: [],
            legendBarLatency: [],
            totalNumberVolume: 0,
            updateChart: true,
            updateTotal: true,
            spinnerLoading: true,
            requestUsage: {
                requestUsageVolume: {
                    "queryType": "timeseries",
                    "dataSource": "nio20191208FULL",
                    "descending": "false",
                    "granularity": "hour",
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
                    "intervals": ["2019-12-08T00:00:00.000Z/2019-12-08T23:59:59.000Z"]
                },
                requestUsageThroughput: {
                    "queryType": "timeseries",
                    "dataSource": "nio20191208FULL",
                    "descending": "false",
                    "granularity": "hour",
                    "aggregations": [
                        {
                            "type": "longSum",
                            "name": "Sumvol_in",
                            "fieldName": "Rvol_in"
                        },
                        {
                            "type": "longSum",
                            "name": "Sumvol_out",
                            "fieldName": "Rvol_out"
                        }

                    ],
                    "postAggregations": [
                        {
                            "type": "arithmetic",
                            "name": "ThroughPutVolIn",
                            "fn": "/",
                            "fields": [
                                { "type": "fieldAccess", "name": "postAgg__vol_in", "fieldName": "Sumvol_in" },
                                { "type": "constant", "name": "const111111111111", "value": 3600 }

                            ]
                        },
                        {
                            "type": "arithmetic",
                            "name": "ThroughPutVolOut",
                            "fn": "/",
                            "fields": [
                                { "type": "fieldAccess", "name": "postAgg__vol_in", "fieldName": "Sumvol_out" },
                                { "type": "constant", "name": "const111111111111", "value": 3600 }

                            ]
                        }
                    ],
                    "intervals": ["2019-12-08T00:00:00.000Z/2019-12-08T23:59:59.000Z"]
                },
                requestUsageActiveSubcriber: {
                    "queryType": "timeseries",
                    "dataSource": "nio20191208FULL",
                    "descending": "false",
                    "granularity": "hour",
                    "aggregations": [
                        {
                            "type": "cardinality",
                            "name": "distinct_msisdn",
                            "fields": ["msisdn"],
                            "byRow": false
                        }
                    ],
                    "intervals": ["2019-12-08T00:00:00.000Z/2019-12-08T23:59:59.000Z"]
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
                    "intervals": ["2019-12-08T00:00:00.000Z/2019-12-08T23:59:59.000Z"]
                },
                requestConnectPacketLoss: {
                    "queryType": "timeseries",
                    "dataSource": "nio20191208FULL",
                    "descending": "false",
                    "granularity": "hour",
                    "aggregations": [
                        {
                            "type": "longSum",
                            "name": "rxmit_pkt_in",
                            "fieldName": "Rrxmit_pkt_in"
                        },
                        {
                            "type": "longSum",
                            "name": "pkt_in",
                            "fieldName": "Rpkt_in"
                        },
                        {
                            "type": "longSum",
                            "name": "rxmit_pkt_out",
                            "fieldName": "Rrxmit_pkt_out"
                        },
                        {
                            "type": "longSum",
                            "name": "pkt_out",
                            "fieldName": "Rpkt_out"
                        }

                    ],
                    "postAggregations": [
                        {
                            "type": "arithmetic",
                            "name": "POstrxmit_pkt_in",
                            "fn": "/",
                            "fields": [
                                { "type": "fieldAccess", "name": "postAgg__rxmit_pkt_in", "fieldName": "rxmit_pkt_in" },
                                { "type": "fieldAccess", "name": "postAgg__pkt_in", "fieldName": "pkt_in" }

                            ]
                        },

                        {
                            "type": "arithmetic",
                            "name": "POstrxmit_pkt_OUT",
                            "fn": "/",
                            "fields": [
                                { "type": "fieldAccess", "name": "postAgg__rxmit_pkt_OUT", "fieldName": "rxmit_pkt_out" },
                                { "type": "fieldAccess", "name": "postAgg__pkt_OUT", "fieldName": "pkt_out" }

                            ]
                        },

                        { "type": "constant", "name": "const111111111111", "value": 100 }
                    ],
                    "intervals": ["2019-12-08T00:00:00.000Z/2019-12-08T23:59:59.000Z"]
                }

            },
            dataUsage: {
                dataUsageVolume: {
                    legendLabel: "",
                    labelData: ['byte', 'byte', 'byte', 'byte'],
                    dataTranfer: {
                        uplink: 0,
                        downlink: 0,
                        totalUpDown: 0,
                        average: 0,
                        label: []
                    },
                    totalDataVolume: 0,
                    labels: ['Uplink', 'Downlink'],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        data: [0, 0],
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
                    legendLabel: "Throughput",
                    dataPeak: {
                        uplink: 0,
                        downlink: 0,
                        totalUpDown: 0,
                        label: []
                    },
                    labels: [],
                    dataTranfer: {
                        uplink: [],
                        downlink: [],
                        labelTransferUplink: [],
                        labelTransferDownlink: []

                    }
                    ,
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
                    legendLabel: "Active Subcribers",
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: '',
                        data: [
                        ],
                        backgroundColor: '#5073b7'
                    }
                    ]
                },

            },
            dataConnect: {
                dataConnectPacketLoss: {
                    legendLabel: "Package Loss",
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    dataPeak: {
                        internal: 0,
                        external: 0
                    },
                    datasets: [{
                        label: 'Internal',
                        data: [
                        ],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'External',
                        data: [
                        ],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
                dataConnectLatency: {
                    legendLabel: "Latency",
                    dataPeak: {
                        internal: 0,
                        external: 0
                    },
                    labels: [],
                    fontSize: 10,
                    position: "left",
                    datasets: [{
                        label: 'Internal',
                        data: [],
                        backgroundColor: '#5073b7'
                    },
                    {
                        label: 'External',
                        data: [],
                        backgroundColor: '#bbcaef'
                    }
                    ]
                },
            },
            dataTotal: {
                dataUsage: {
                    dataUsageActiveSubcriber: {},
                    dataUsageThroughput: {},
                    dataUsageVolume: {}
                },
                dataConnect: {
                    dataConnectLatency: {},
                    dataConnectPacketLoss: {}
                }
            },
            optionsDoughVolume: {
                responsiveAnimationDuration: 0,
                responsive: true,
                cutoutPercentage: 80,
                legend: {
                    display: false
                },
                tooltips: {
                    bodyFontSize: 9.5,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let index = tooltipItem.index
                            if (index === 0) {
                                return " Uplink " + data.dataTranfer.uplink + " " + data.dataTranfer.label[index]
                            }
                            else {
                                return " Downlink " + data.dataTranfer.downlink + " " + data.dataTranfer.label[index]
                            }
                        },
                    }
                },

            },
            optionsBarToNegativeNumb: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let index = tooltipItem.datasetIndex
                            let value = parseFloat(tooltipItem.value).toFixed(2)
                            value = Math.abs(value)
                            if (data.legendLabel === "Active Subcribers")
                                return data.legendLabel + " " + data.datasets[index].label + " " + value.toLocaleString('ja-JP')
                            if (data.legendLabel === "Package Loss")
                                return data.legendLabel + " " + data.datasets[index].label + " " + value + "%"
                            if (data.legendLabel === "Latency")
                                return data.legendLabel + " " + data.datasets[index].label + " " + value + " ms"
                            return data.legendLabel + " " + data.datasets[index].label + " " + value
                        },
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        display: false,
                        ticks: {
                            display: false,
                            min: 0
                        },
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }],
                }
            },
            optionsBarToNegativeNumbThroughtPut: {

                maintainAspectRatio: false,
                responsive: true,
                animation: {
                    duration: 0
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let index = tooltipItem.index
                            let indexDataSet = tooltipItem.datasetIndex
                            let value = parseFloat(tooltipItem.value).toFixed(2)
                            value = Math.abs(value)
                            if (tooltipItem.datasetIndex === 0)
                                return data.legendLabel + " " + data.datasets[indexDataSet].label + " " + data.dataTranfer.uplink[index].value + " " + data.dataTranfer.labelTransferUplink[index] + "/s"
                            else
                                return data.legendLabel + " " + data.datasets[indexDataSet].label + " " + data.dataTranfer.downlink[index].value + " " + data.dataTranfer.labelTransferDownlink[index] + "/s"
                        },
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        display: false,
                        ticks: {
                            display: false,
                            min: 0
                        },
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }],
                }
            },

        }
        this.toggleExcelBtn = React.createRef()
        this.toggleCSVBtn = React.createRef()
    }
    fetchAllData = async () => {
        if (this._isMounted) {
            let dataConnect = Object.assign({}, this.state.dataConnect)
            let dataUsage = Object.assign({}, this.state.dataUsage)
            let requestUsage = Object.assign({}, this.state.requestUsage)
            let requestConnect = Object.assign({}, this.state.requestConnect)
            // this.fetchUsageThroughputData(dataUsage, requestUsage)
            // this.fetchConnectLatencyData(dataConnect, requestConnect)
            // this.fetchConnectPackageLossData(dataConnect, requestConnect)
            // this.fetchUsageActiveSubData(dataUsage, requestUsage)

            await Promise.all([
                this.fetchUsageActiveSubData(dataUsage, requestUsage),
                this.fetchConnectLatencyData(dataConnect, requestConnect),
                this.fetchConnectPackageLossData(dataConnect, requestConnect),
                this.fetchUsageThroughputData(dataUsage, requestUsage),
            ]).then(res => {
                if (this._isMounted) {
                    let dataToExport = Object.assign([], this.state.dataToExport)
                    let tmpTime = Object.assign([], this.state.tmpTime)
                    let tmpActive_subscribers = Object.assign([], this.state.tmpActive_subscribers)
                    let tmpThroughput_uplink = Object.assign([], this.state.tmpThroughput_uplink)
                    let tmpThroughput_downlink = Object.assign([], this.state.tmpThroughput_downlink)
                    let tmpInt_packet_loss = Object.assign([], this.state.tmpInt_packet_loss)
                    let tmpExt_packet_loss = Object.assign([], this.state.tmpExt_packet_loss)
                    let tmpInt_latency = Object.assign([], this.state.tmpInt_latency)
                    let tmpExt_latency = Object.assign([], this.state.tmpExt_latency)
                    for (let i = 0; i < tmpTime.length; i++) {
                        let tmpdata = {
                            Time: tmpTime[i],
                            active_subscribers: tmpActive_subscribers[i],
                            throughput_uplink: tmpThroughput_uplink[i],
                            throughput_downlink: tmpThroughput_downlink[i],
                            int_packet_loss: tmpInt_packet_loss[i],
                            ext_packet_loss: tmpExt_packet_loss[i],
                            int_latency: tmpInt_latency[i],
                            ext_latency: tmpExt_latency[i],
                        }
                        dataToExport.push(tmpdata)
                    }
                    if (this._isMounted) this.setState({ dataToExport })
                }
            }).catch(err => {

            })
        }
    }

    fetchUsageActiveSubData = async (dataUsage, requestUsage) => {

        //Get data for Active Sub Chart
        let dataUsageActiveSubcriber = dataUsage.dataUsageActiveSubcriber
        let tmpActive_subscribers = Object.assign([], this.state.tmpActive_subscribers)
        let tmpTime = Object.assign([], this.state.tmpTime)
        await (callAPI(requestUsage.requestUsageActiveSubcriber).then(res => {
            if (this._isMounted) {
                tmpActive_subscribers.length = 0
                tmpTime.length = 0
                dataUsageActiveSubcriber.labels.length = 0
                dataUsageActiveSubcriber.datasets[0].data.length = 0
                res.data.map((item, index) => {
                    let tmpDistinct = Math.floor(item.result.distinct_msisdn)
                    tmpActive_subscribers.push(tmpDistinct)
                    tmpTime.push(item.timestamp)
                    let a = {
                        x: this.formatISOToUSerTime(item.timestamp),
                        y: tmpDistinct
                    }
                    dataUsageActiveSubcriber.labels.push(this.formatISOToUSerTime(item.timestamp))
                    dataUsageActiveSubcriber.datasets[0].data.push(a)
                })
            }
        }).catch(err => {
            console.log(err)
            dataUsageActiveSubcriber.labels.length = 0
            dataUsageActiveSubcriber.datasets[0].data.length = 0
            tmpActive_subscribers.length = 0
            tmpTime.length = 0
        }))
        this._isMounted && this.setState({
            dataUsage: dataUsage,
            tmpActive_subscribers,
            tmpTime
        })

    }
    fetchUsageThroughputData = async (dataUsage, requestUsage) => {

        //Get data for Throughput Chart
        let dataUsageThroughput = dataUsage.dataUsageThroughput
        let tmpThroughput_uplink = Object.assign([], this.state.tmpThroughput_uplink)
        let tmpThroughput_downlink = Object.assign([], this.state.tmpThroughput_downlink)
        await (callAPI(requestUsage.requestUsageThroughput).then(res => {
            if (this._isMounted) {
                dataUsageThroughput.labels.length = 0
                dataUsageThroughput.datasets[0].data.length = 0
                dataUsageThroughput.datasets[1].data.length = 0
                tmpThroughput_uplink.length = 0
                tmpThroughput_downlink.length = 0
                for (let i = 0; i <= 2; i++) {
                    dataUsageThroughput.dataPeak.label[i] = "bit"
                }
                dataUsageThroughput.dataTranfer.uplink.length = 0
                dataUsageThroughput.dataTranfer.downlink.length = 0
                dataUsageThroughput.dataTranfer.labelTransferUplink.length = 0
                dataUsageThroughput.dataTranfer.labelTransferDownlink.length = 0
                dataUsageThroughput.dataPeak.totalUpDown = 0
                dataUsageThroughput.dataPeak.uplink = 0
                dataUsageThroughput.dataPeak.downlink = 0
                if (res.data.length > 0) {
                    res.data.map((item, index) => {
                        tmpThroughput_uplink.push(item.result.ThroughPutVolOut)
                        tmpThroughput_downlink.push(item.result.ThroughPutVolIn)
                        //FIND PEAK 
                        if (dataUsageThroughput.dataPeak.totalUpDown < (item.result.ThroughPutVolOut + item.result.ThroughPutVolIn)) {
                            dataUsageThroughput.dataPeak.totalUpDown = item.result.ThroughPutVolOut + item.result.ThroughPutVolIn
                            dataUsageThroughput.dataPeak.uplink = item.result.ThroughPutVolOut
                            dataUsageThroughput.dataPeak.downlink = item.result.ThroughPutVolIn
                        }

                        //chuyen doi cac gia tri uplink, downlink byte -> MB,GB,... va luu vao dataTransfer
                        let rawTmpUplink = this.bitsToSize(item.result.ThroughPutVolOut)
                        let rawTmpDownlink = this.bitsToSize(item.result.ThroughPutVolIn)
                        dataUsageThroughput.dataTranfer.labelTransferUplink.push(rawTmpUplink.labelValue)
                        dataUsageThroughput.dataTranfer.labelTransferDownlink.push(rawTmpDownlink.labelValue)
                        let a = {
                            x: this.formatISOToUSerTime(item.timestamp),
                            y: item.result.ThroughPutVolOut
                        }
                        let b = {
                            x: this.formatISOToUSerTime(item.timestamp),
                            y: -item.result.ThroughPutVolIn
                        }
                        dataUsageThroughput.dataTranfer.uplink.push(rawTmpUplink)
                        dataUsageThroughput.dataTranfer.downlink.push(rawTmpDownlink)
                        dataUsageThroughput.labels.push(this.formatISOToUSerTime(item.timestamp))
                        dataUsageThroughput.datasets[0].data.push(a)
                        dataUsageThroughput.datasets[1].data.push(b)
                        // dataUsageThroughput.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
                    })
                    let rawPeakUpDown = this.bitsToSize(dataUsageThroughput.dataPeak.totalUpDown)
                    let rawPeakUplink = this.bitsToSize(dataUsageThroughput.dataPeak.uplink)
                    let rawPeakDownlink = this.bitsToSize(dataUsageThroughput.dataPeak.downlink)
                    dataUsageThroughput.dataPeak.totalUpDown = rawPeakUpDown.value
                    dataUsageThroughput.dataPeak.uplink = rawPeakUplink.value
                    dataUsageThroughput.dataPeak.downlink = rawPeakDownlink.value
                    dataUsageThroughput.dataPeak.label[0] = rawPeakUplink.labelValue
                    dataUsageThroughput.dataPeak.label[1] = rawPeakDownlink.labelValue
                    dataUsageThroughput.dataPeak.label[2] = rawPeakUpDown.labelValue
                }
            }

        }).catch(err => {
            console.error(err)
            dataUsageThroughput.labels.length = 0
            dataUsageThroughput.datasets[0].data.length = 0
            dataUsageThroughput.datasets[1].data.length = 0
            for (let i = 0; i <= 2; i++) {
                dataUsageThroughput.dataPeak.label[i] = "bit"
            }
            dataUsageThroughput.dataTranfer.uplink.length = 0
            dataUsageThroughput.dataTranfer.downlink.length = 0
            dataUsageThroughput.dataTranfer.labelTransferUplink.length = 0
            dataUsageThroughput.dataTranfer.labelTransferDownlink.length = 0
            dataUsageThroughput.dataPeak.totalUpDown = 0
            dataUsageThroughput.dataPeak.uplink = 0
            dataUsageThroughput.dataPeak.downlink = 0
            tmpThroughput_uplink.length = 0
            tmpThroughput_downlink.length = 0
        }))
        this._isMounted && this.setState({
            tmpThroughput_uplink,
            tmpThroughput_downlink,
            dataUsage: dataUsage,
        })
    }
    fetchConnectPackageLossData = async (dataConnect, requestConnect) => {
        //Get data for PackageLoss Chart
        let dataConnectPacketLoss = dataConnect.dataConnectPacketLoss
        let tmpInt_packet_loss = Object.assign([], this.state.tmpInt_packet_loss)
        let tmpExt_packet_loss = Object.assign([], this.state.tmpExt_packet_loss)
        await (callAPI(requestConnect.requestConnectPacketLoss).then(res => {
            if (this._isMounted) {
                tmpInt_packet_loss.length = 0
                tmpExt_packet_loss.length = 0
                dataConnectPacketLoss.labels.length = 0
                dataConnectPacketLoss.datasets[0].data.length = 0
                dataConnectPacketLoss.datasets[1].data.length = 0
                dataConnectPacketLoss.dataPeak.internal = 0
                dataConnectPacketLoss.dataPeak.external = 0
                if (res.data.length > 0) {
                    res.data.map((item, index) => {
                        let internal = (item.result.POstrxmit_pkt_in * 100).toFixed(1)
                        let external = (item.result.POstrxmit_pkt_OUT * 100).toFixed(1)
                        tmpInt_packet_loss.push(item.result.POstrxmit_pkt_in)
                        tmpExt_packet_loss.push(item.result.POstrxmit_pkt_OUT)
                        let a = {
                            x: this.formatISOToUSerTime(item.timestamp),
                            y: internal
                        }
                        let b = {
                            x: this.formatISOToUSerTime(item.timestamp),
                            y: -external
                        }
                        dataConnectPacketLoss.labels.push(this.formatISOToUSerTime(item.timestamp))
                        dataConnectPacketLoss.datasets[0].data.push(a)
                        dataConnectPacketLoss.datasets[1].data.push(b)
                        // dataConnectPacketLoss.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
                        if (internal > dataConnectPacketLoss.dataPeak.internal) dataConnectPacketLoss.dataPeak.internal = internal
                        if (external > dataConnectPacketLoss.dataPeak.external) dataConnectPacketLoss.dataPeak.external = external
                    }
                    )
                }

            }
        }).catch(err => {
            console.error(err)
            dataConnectPacketLoss.dataPeak.internal = 0
            dataConnectPacketLoss.dataPeak.external = 0
            dataConnectPacketLoss.labels.length = 0
            dataConnectPacketLoss.datasets[0].data.length = 0
            dataConnectPacketLoss.datasets[1].data.length = 0
            tmpInt_packet_loss.length = 0
            tmpExt_packet_loss.length = 0
        }))
        this._isMounted && this.setState({
            dataConnect: dataConnect,
            spinnerLoading: false,
            tmpInt_packet_loss,
            tmpExt_packet_loss
        })

    }
    fetchConnectLatencyData = async (dataConnect, requestConnect) => {
        //Get data for Latency Chart
        let dataConnectLatency = dataConnect.dataConnectLatency
        let tmpInt_latency = Object.assign([], this.state.tmpInt_latency)
        let tmpExt_latency = Object.assign([], this.state.tmpExt_latency)
        await (
            callAPI(requestConnect.requestConnectLatency).then(res => {
                if (this._isMounted) {
                    tmpInt_latency.length = 0
                    tmpExt_latency.length = 0
                    dataConnectLatency.labels.length = 0
                    dataConnectLatency.datasets[0].data.length = 0
                    dataConnectLatency.datasets[1].data.length = 0
                    dataConnectLatency.dataPeak.internal = 0
                    dataConnectLatency.dataPeak.external = 0
                    if (res.data.length > 0) {
                        res.data.map((item) => {

                            let internal = Math.floor(item.result.Sumclient_delay / item.result.Sum_client_delayNotZero)
                            let external = Math.floor(item.result.SumRstd / item.result.Sum_stdNotZero)
                            tmpInt_latency.push(internal)
                            tmpExt_latency.push(external)
                            let a = {
                                x: this.formatISOToUSerTime(item.timestamp),
                                y: internal
                            }
                            let b = {
                                x: this.formatISOToUSerTime(item.timestamp),
                                y: -external
                            }
                            if (internal > dataConnectLatency.dataPeak.internal) dataConnectLatency.dataPeak.internal = internal
                            if (external > dataConnectLatency.dataPeak.external) dataConnectLatency.dataPeak.external = external
                            dataConnectLatency.labels.push(this.formatISOToUSerTime(item.timestamp))
                            dataConnectLatency.datasets[0].data.push(a)
                            dataConnectLatency.datasets[1].data.push(b)


                        })
                    }
                    // dataConnectLatency.datasets[1].data.map(item => { if (item.y > 0) item.y = 0 - (item.y) })
                    this.setState({ spinnerLoading: false, })
                }
            })
                .catch(err => {
                    console.error(err)
                    dataConnectLatency.labels.length = 0
                    dataConnectLatency.datasets[0].data.length = 0
                    dataConnectLatency.datasets[1].data.length = 0
                    dataConnectLatency.dataPeak.internal = 0
                    dataConnectLatency.dataPeak.external = 0
                    tmpInt_latency.length = 0
                    tmpExt_latency.length = 0
                }))
        this._isMounted && this.setState({
            dataConnect: dataConnect,
            tmpInt_latency,
            tmpExt_latency,
        })

    }
    fetchDataTotal = async () => {
        let requestUsage = JSON.parse(JSON.stringify(this.state.requestUsage))
        let requestConnect = JSON.parse(JSON.stringify(this.state.requestConnect))
        let dataTotal = Object.assign({}, this.state.dataTotal)
        let dataUsage = Object.assign({}, this.state.dataUsage)
        requestUsage.requestUsageVolume['granularity'] = "all"
        requestUsage.requestUsageActiveSubcriber['granularity'] = "all"
        requestUsage.requestUsageThroughput['granularity'] = "all"
        requestConnect.requestConnectLatency['granularity'] = "all"
        requestConnect.requestConnectPacketLoss['granularity'] = "all"
        // axios.all()
        await Promise.all(
            [
                (
                    callAPI(requestUsage.requestUsageActiveSubcriber).then(res => {
                        if (this._isMounted) {
                            if (res.data.length <= 0) {
                                let tmpdata = { distinct_msisdn: 0 }
                                dataTotal.dataUsage.dataUsageActiveSubcriber = tmpdata
                            }
                            else {
                                dataTotal.dataUsage.dataUsageActiveSubcriber = res.data[0].result

                            }
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                ),
                (
                    callAPI(requestUsage.requestUsageThroughput).then(res => {
                        if (this._isMounted) {
                            let data = {}
                            if (res.data.length <= 0) {
                                data = {
                                    totalUpDown: 0,
                                    totalUpLink: 0,
                                    totalDownLink: 0,
                                    labelTotalUpDown: "bit",
                                    labelUpLink: "bit",
                                    labelDownLink: "bit",
                                }
                            }
                            else {
                                let second = (this.state.endDate.getTime() - this.state.startDate.getTime()) / 1000
                                let tmpTotalUpdown = this.bitsToSize((res.data[0].result.Sumvol_out + res.data[0].result.Sumvol_in) / second)
                                let tmpUpLink = this.bitsToSize(res.data[0].result.Sumvol_out / second)
                                let tmpDownLink = this.bitsToSize(res.data[0].result.Sumvol_in / second)
                                data = {
                                    totalUpDown: tmpTotalUpdown.value,
                                    labelTotalUpDown: tmpTotalUpdown.labelValue,
                                    totalUpLink: tmpUpLink.value,
                                    labelUpLink: tmpUpLink.labelValue,
                                    totalDownLink: tmpDownLink.value,
                                    labelDownLink: tmpDownLink.labelValue,
                                }
                            }

                            dataTotal.dataUsage.dataUsageThroughput = data
                        }
                    }).catch(err => {
                        console.log(err)
                        let data = {
                            totalUpDown: 0,
                            totalUpLink: 0,
                            totalDownLink: 0,
                            labelTotalUpDown: "bit",
                            labelUpLink: "bit",
                            labelDownLink: "bit",
                        }

                        dataTotal.dataUsage.dataUsageThroughput = data
                    })
                ),
                (
                    callAPI(requestUsage.requestUsageVolume).then(res => {
                        if (this._isMounted) {
                            if (res.data.length > 0) {
                                let tmpTransferUpLink = this.bytesToSize(res.data[0].result.vol_out)
                                let tmpTransferDownLink = this.bytesToSize(res.data[0].result.vol_in)
                                let tmpTransferUpDown = this.bytesToSize(res.data[0].result.vol_in + res.data[0].result.vol_out)
                                dataTotal.dataUsage.dataUsageVolume = res.data[0].result
                                dataUsage.dataUsageVolume.datasets[0].data[0] = res.data[0].result.vol_out
                                dataUsage.dataUsageVolume.datasets[0].data[1] = res.data[0].result.vol_in
                                dataUsage.dataUsageVolume.dataTranfer.average = (res.data[0].result.vol_in + res.data[0].result.vol_out)
                                dataUsage.dataUsageVolume.dataTranfer.uplink = tmpTransferUpLink.value
                                dataUsage.dataUsageVolume.dataTranfer.label[0] = tmpTransferUpLink.labelValue
                                dataUsage.dataUsageVolume.dataTranfer.downlink = tmpTransferDownLink.value
                                dataUsage.dataUsageVolume.dataTranfer.label[1] = tmpTransferDownLink.labelValue
                                dataUsage.dataUsageVolume.dataTranfer.totalUpDown = tmpTransferUpDown.value
                                dataUsage.dataUsageVolume.dataTranfer.label[2] = tmpTransferUpDown.labelValue
                            }
                            else {
                                dataTotal.dataUsage.dataUsageVolume = 0
                                dataUsage.dataUsageVolume.datasets[0].data[0] = 0
                                dataUsage.dataUsageVolume.datasets[0].data[1] = 0
                                dataUsage.dataUsageVolume.dataTranfer.average = 0
                                dataUsage.dataUsageVolume.dataTranfer.uplink = 0
                                dataUsage.dataUsageVolume.dataTranfer.label[0] = "byte"
                                dataUsage.dataUsageVolume.dataTranfer.downlink = 0
                                dataUsage.dataUsageVolume.dataTranfer.label[1] = "byte"
                                dataUsage.dataUsageVolume.dataTranfer.totalUpDown = 0
                                dataUsage.dataUsageVolume.dataTranfer.label[2] = "byte"
                            }
                        }
                    }).catch(err => {
                        console.log(err)
                        dataTotal.dataUsage.dataUsageVolume = 0
                        dataUsage.dataUsageVolume.datasets[0].data[0] = 0
                        dataUsage.dataUsageVolume.datasets[0].data[1] = 0
                        dataUsage.dataUsageVolume.dataTranfer.average = 0
                        dataUsage.dataUsageVolume.dataTranfer.uplink = 0
                        dataUsage.dataUsageVolume.dataTranfer.label[0] = "byte"
                        dataUsage.dataUsageVolume.dataTranfer.downlink = 0
                        dataUsage.dataUsageVolume.dataTranfer.label[1] = "byte"
                        dataUsage.dataUsageVolume.dataTranfer.totalUpDown = 0
                        dataUsage.dataUsageVolume.dataTranfer.label[2] = "byte"
                    })
                )
                ,
                (
                    callAPI(requestConnect.requestConnectLatency).then(res => {
                        if (this._isMounted) {
                            let tmpdata = {}
                            if (res.data.length > 0) {
                                tmpdata = {
                                    external: Math.floor(res.data[0].result.SumRstd / res.data[0].result.Sum_stdNotZero),
                                    internal: Math.floor(res.data[0].result.Sumclient_delay / res.data[0].result.Sum_client_delayNotZero),
                                }
                            }
                            else {
                                tmpdata = {
                                    internal: 0,
                                    external: 0,
                                }
                            }

                            dataTotal.dataConnect.dataConnectLatency = tmpdata
                        }

                    }).catch(err => {
                        console.log(err)
                        let tmpdata = {
                            internal: 0,
                            external: 0,
                        }
                        dataTotal.dataConnect.dataConnectLatency = tmpdata
                    })
                )
                ,
                (
                    callAPI(requestConnect.requestConnectPacketLoss).then(res => {
                        if (this._isMounted) {
                            let tmpdata = {}
                            if (res.data.length > 0) {
                                tmpdata = {
                                    internal: (res.data[0].result.POstrxmit_pkt_in * 100).toFixed(1),
                                    external: (res.data[0].result.POstrxmit_pkt_OUT * 100).toFixed(1)
                                }
                            }
                            else {
                                tmpdata = {
                                    internal: 0,
                                    external: 0,
                                }
                            }
                            dataTotal.dataConnect.dataConnectPacketLoss = tmpdata
                        }
                    }).catch(err => {
                        console.log(err)
                        let tmpdata = {
                            internal: 0,
                            external: 0,
                        }
                        dataTotal.dataConnect.dataConnectPacketLoss = tmpdata
                    })
                )
            ])
        if (this._isMounted) {
            if (dataUsage.dataUsageVolume.dataTranfer.average > 0) {
                let tmpTransferAverage = this.bytesToSize(dataUsage.dataUsageVolume.dataTranfer.average / dataTotal.dataUsage.dataUsageActiveSubcriber.distinct_msisdn)
                dataUsage.dataUsageVolume.dataTranfer.average = tmpTransferAverage.value
                dataUsage.dataUsageVolume.dataTranfer.label[3] = tmpTransferAverage.labelValue
            }
            else {
                dataUsage.dataUsageVolume.dataTranfer.average = 0
                dataUsage.dataUsageVolume.dataTranfer.label[3] = "byte"
            }
        }
        if (this._isMounted) this.setState({ dataTotal })
    }
    componentDidUpdate = () => {
        if (this._isMounted) {
            if (this.state.updateChart === true) {
                this.setState({ updateChart: false })
                this.fetchAllData().then(res => {
                    if (this._isMounted) this.setState({ updateChart: false })
                }).catch(err => {
                    console.log(err)
                    if (this._isMounted) this.setState({ updateChart: false })
                })

            }
            if (this.state.updateTotal === true) {
                this.setState({ updateTotal: false })
                this.fetchDataTotal().then(res => {

                })
                if (this._isMounted) this.setState({
                    updateTotal: false,
                })
            }

            if (this.state.spinnerLoading === false) {
                if (!this.state.pauseInterval && !this.state.isSetInterval) {
                    this.setState({ isSetInterval: true })
                    let defaultRemainingTime = this.state.defaultRemainingTime
                    let intervalId = setTimeout(() => {
                        this.setState({ updateTotal: true, updateChart: true, spinnerLoading: true, remainingTime: defaultRemainingTime, isSetInterval: false })
                    }
                        , this.state.remainingTime * 1000)
                    this.setState({ intervalId })
                }
                else if (this.state.pauseInterval && this.state.isSetInterval) {
                    clearInterval(this.state.intervalId)
                    this.setState({ isSetInterval: false })
                }
            }
        }
    }
    componentDidMount = () => {
        // this.setState({ legendDoughnutVolume: this.doughnutVolume.chartInstance.legend.legendItems });
        // this.setState({ legendBarLatency: this.barLatency.chartInstance.legend.legendItems });
        setTimeout(() => this.setState({ delayShow: true }), 1500)
        this._isMounted = true


    }
    componentWillUnmount = () => {
        this._isMounted = false

        //cancelRequest()
    }

    changeFormatTime = (date) => {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    }
    handleChangeStartDate = (date) => {

        this.setState({ startDate: date })
    }
    handleChangeEndDate = (date) => {
        this.setState({ endDate: date })
        let startDate = this.state.startDate
        let endDate = date
        startDate = this.changeFormatTime(startDate)
        endDate = this.changeFormatTime(endDate)
        let requestUsage = Object.assign({}, this.state.requestUsage)
        let requestConnect = Object.assign({}, this.state.requestConnect)
        requestUsage.requestUsageVolume.intervals = [startDate + "/" + endDate]
        requestUsage.requestUsageThroughput.intervals = [startDate + "/" + endDate]
        requestUsage.requestUsageActiveSubcriber.intervals = [startDate + "/" + endDate]
        requestConnect.requestConnectLatency.intervals = [startDate + "/" + endDate]
        requestConnect.requestConnectPacketLoss.intervals = [startDate + "/" + endDate]

        this.setState({ requestUsage: requestUsage, requestConnect: requestConnect, updateTotal: true, updateChart: true, spinnerLoading: true })

    }
    handleChangeSummary = (data, index) => {
        this.setState({ currentSummary: index })
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
    }

    bitsToSize = (bytes) => {
        let sizes = ['Bits', 'Kb', 'Mb', 'Gb', 'Tb'];
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
    }
    formatISOToUSerTime = (data) => {
        return data.substring(0, 10) + " " + data.substring(11, 19)
    }

    handleChangeTypeOfInterval = (data) => {
        let tmpValueSecond = 0
        if (data.target.value === "day") {
            tmpValueSecond = 3600 * 24
        }
        else if (data.target.value === "hour") {
            tmpValueSecond = 3600
        }
        if (data.target.value === "minute") {
            tmpValueSecond = 60
        }

        let requestUsage = Object.assign({}, this.state.requestUsage)
        let requestConnect = Object.assign({}, this.state.requestConnect)
        requestUsage.requestUsageVolume['granularity'] = data.target.value
        requestUsage.requestUsageActiveSubcriber['granularity'] = data.target.value
        requestUsage.requestUsageThroughput['granularity'] = data.target.value
        requestUsage.requestUsageThroughput.postAggregations[0].fields[1].value = tmpValueSecond
        requestUsage.requestUsageThroughput.postAggregations[1].fields[1].value = tmpValueSecond
        requestConnect.requestConnectLatency['granularity'] = data.target.value
        requestConnect.requestConnectPacketLoss['granularity'] = data.target.value
        this.setState({ typeofInterVal: data.target.value, requestUsage: requestUsage, updateChart: true, requestConnect: requestConnect, spinnerLoading: true })

    }
    handleChangePauseInterval = () => {
        let interval = !this.state.pauseInterval
        interval && this.setState({ isSettedRemaining: false })
        this.setState({ pauseInterval: interval })
    }
    handleChangeExportType = (e) => {
        if (e.currentTarget === "xlsx") {
            this.toggleExcelBtn.current.click()
        }
        else if (e.currentTarget === "csv") {
            this.toggleCSVBtn.current.click()
        }
        this.setState({ anchorEl: e.currentTarget })
    }

    closeSelectFileExport = () => {

        this.setState({ anchorEl: null })
    }
    render() {

        const { typeofInterVal, endDate, startDate, currentSummary, delayShow, pauseInterval, isSettedRemaining, remainingTime, currentExportType, selectFileExport, dataToExport, anchorEl } = this.state
        const { currentWidth, isSubMenuOpened } = this.props

        return (
            <div className="main-panel" style={{ width: "100%" }}>

                <div className="panel-header">
                    {/*MENU CHANGE COMPONENT */}
                    {delayShow ?
                        <div className="page-inner border-bottom pb-0 mb-3 pl-4">
                            <div className="d-flex align-items-left flex-column">
                                <div className="nav-scroller d-flex" style={{ overflowX: "auto" }}>
                                    <div className="nav nav-line nav-color-info d-flex align-items-center justify-contents-center">

                                        <Tabs
                                            value={currentSummary}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            onChange={this.handleChangeSummary}
                                            aria-label="disabled tabs example"
                                        >
                                            <Tab className="tabSummary" label={<span className={"tabLabel"}>All</span>} />
                                            <Tab className="tabSummary" label={<span className={"tabLabel"}>Usage</span>} />
                                            <Tab className="tabSummary" label={<span className={"tabLabel"}>Connectivity</span>} />
                                            <Tab className="tabSummary" label={<span className={"tabLabel"}>Control Plane</span>} />
                                        </Tabs>

                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <div className="container-fluid" >

                    <div className="row">

                        {/* DATE PICKER */}

                        {delayShow ?
                            <>
                                <ReactTooltip id={"exportFile-tooltip"} aria-haspopup='true' delayShow={300}>
                                    <p className="datePicker-tooltip">Export data to file...</p>
                                </ReactTooltip>

                                <div className="col-md-6 paddingLRCard">
                                    <div className="row" style={{ padding: "10px 0" }}>
                                        {currentWidth <= 991 ? null : <div className="col-md-3 content-middle">
                                            <p>
                                                Date Range
                                                    </p>
                                        </div>}
                                        <div className={currentWidth <= 991 ? "col-md-12" : "col-md-4"} >

                                            {currentWidth <= 991 ? <p>Start Date</p> : null}
                                            <ReactTooltip id="startDate-tooltip" delayShow={500}>
                                                <p className="datePicker-tooltip">Start Date</p>
                                            </ReactTooltip>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                <Grid container justify="space-around" >
                                                    <DatePicker
                                                        inputProps={{ style: { textAlign: 'center', cursor: 'pointer' } }}
                                                        inputVariant="outlined"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        className="dateTimePicker"
                                                        value={startDate}
                                                        onChange={this.handleChangeStartDate}
                                                        data-tip data-for={"startDate-tooltip"}
                                                    /></Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        {currentWidth <= 991 ? null : <div className="col-md-1 noPadding">
                                            <p style={{ fontSize: "50px" }}>-</p>
                                        </div>}
                                        <div className={currentWidth <= 991 ? "col-md-12" : "col-md-4"} >
                                            {currentWidth <= 991 ? <p>End Date</p> : null}
                                            <ReactTooltip id="endDate-tooltip" delayShow={500}>
                                                <p className="datePicker-tooltip">End Date</p>
                                            </ReactTooltip>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around">
                                                    <DatePicker
                                                        inputProps={{ style: { textAlign: 'center', cursor: 'pointer' } }}
                                                        inputVariant="outlined"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="outlined-basic"
                                                        className="dateTimePicker"
                                                        value={endDate}
                                                        onChange={this.handleChangeEndDate}
                                                        data-tip data-for={"endDate-tooltip"}
                                                    />

                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-md-1 offset-md-1 content-middle">
                                    <FormControl component="fieldset" >
                                        <RadioGroup style={{ display: 'flex', flexDirection: 'row' }} aria-label="gender" name="gender1" value={typeofInterVal} onChange={this.handleChangeTypeOfInterval}>
                                            <FormControlLabel value="hour" control={<Radio color="primary" />} label="Hour" />
                                            <FormControlLabel value="day" control={<Radio color="primary" />} label="Day" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="col-md-4 content-middle" >
                                    {currentWidth > 768 ?
                                        <div className="row countdownTimer">
                                            <div className="col-md-4 content-middle">
                                                <div className="row content-middle">

                                                    <button data-tip data-for={"exportFile-tooltip"} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleChangeExportType}>
                                                        <FontAwesomeIcon icon={faFileExport} />
                                                    </button>

                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={this.closeSelectFileExport}
                                                    >
                                                        {/* <MenuItem onClick={() => this.closeSelectFileExport()}>PDF</MenuItem> */}
                                                        <MenuItem onClick={() => this.closeSelectFileExport()}>
                                                            <CSVLink data={dataToExport} filename={"DashBoard-ExportData.csv"}>
                                                                <button style={{ fontSize: "1.25em" }}>CSV</button>
                                                            </CSVLink>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => this.closeSelectFileExport()}>
                                                            <ExcelFile element={<button>XLSX</button>}>
                                                                <ExcelSheet data={dataToExport} name="Dashboard">
                                                                    <ExcelColumn label="Time" value="Time" />
                                                                    <ExcelColumn label="active_subscribers" value="active_subscribers" />
                                                                    <ExcelColumn label="throughput_uplink" value="throughput_uplink" />
                                                                    <ExcelColumn label="throughput_downlink" value="throughput_downlink" />
                                                                    <ExcelColumn label="int_packet_loss" value="int_packet_loss" />
                                                                    <ExcelColumn label="ext_packet_loss" value="ext_packet_loss" />
                                                                    <ExcelColumn label="int_latency" value="int_latency" />
                                                                    <ExcelColumn label="ext_latency" value="ext_latency" />

                                                                </ExcelSheet>

                                                            </ExcelFile>
                                                        </MenuItem>
                                                    </Menu>

                                                </div>


                                            </div>

                                            <div className="col-md-4">

                                                {pauseInterval ?
                                                    <button onClick={() => this.handleChangePauseInterval()}>
                                                        <FontAwesomeIcon icon={faPlay} />
                                                    </button>
                                                    : <button onClick={() => this.handleChangePauseInterval()}>
                                                        <FontAwesomeIcon icon={faPause} />
                                                    </button>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                {!this.state.spinnerLoading ?
                                                    <div className="countdownTimer-clock">
                                                        <CountdownCircleTimer
                                                            style={{ height: "100px" }}
                                                            size={20}
                                                            strokeWidth={5}
                                                            isPlaying={!pauseInterval}
                                                            duration={this.state.remainingTime}
                                                            colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}

                                                        >
                                                            {pauseInterval ? !isSettedRemaining ? (remainingTime) => {
                                                                this.state.isSettedRemaining = true
                                                                this.state.remainingTime = (remainingTime.remainingTime)
                                                            } : null : null}
                                                        </CountdownCircleTimer>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </>
                            : null}
                        {this.state.spinnerLoading === true ?
                            <React.Fragment>
                                <div className="overlay show"></div>
                                <div className="spanner show">
                                    <div className="loader"></div>
                                    <p style={{ color: "black" }}>Loading data, please be patient.</p>
                                </div>

                            </React.Fragment>
                            :


                            this.state.currentSummary === 0 ?
                                <>
                                    <div className="col-md-4 paddingLRCard">
                                        <Usage
                                            dataUsage={this.state.dataUsage}
                                            optionsBarToNegativeNumbThroughtPut={this.state.optionsBarToNegativeNumbThroughtPut}
                                            optionsDoughVolume={this.state.optionsDoughVolume}
                                            totalNumberVolume={this.state.totalNumberVolume}
                                            optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                            typeOfDay={this.state.typeofInterVal}
                                            dataTotalUsage={this.state.dataTotal.dataUsage}
                                            currentSummary={this.state.currentSummary}
                                        />

                                    </div>
                                    <div className="col-md-4 paddingLRCard">

                                        <Connectivity
                                            dataConnect={this.state.dataConnect}
                                            totalNumberVolume={this.state.totalNumberVolume}
                                            optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                            optionsBarToNegativeNumbThroughtPut={this.state.optionsBarToNegativeNumbThroughtPut}
                                            dataTotalConnect={this.state.dataTotal.dataConnect}
                                            typeOfDay={this.state.typeofInterVal}
                                            currentSummary={this.state.currentSummary}
                                        />


                                    </div>
                                    <div className="col-md-4 paddingLRCard">

                                        <Connectivity
                                            dataConnect={this.state.dataConnect}
                                            totalNumberVolume={this.state.totalNumberVolume}
                                            optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                            optionsBarToNegativeNumbThroughtPut={this.state.optionsBarToNegativeNumbThroughtPut}
                                            typeOfDay={this.state.typeofInterVal}
                                            dataTotalConnect={this.state.dataTotal.dataConnect}
                                            currentSummary={this.state.currentSummary}
                                        />


                                    </div>
                                </>
                                : this.state.currentSummary === 1 ?
                                    <div className="col-md-12 paddingLRCard">

                                        <Usage
                                            dataUsage={this.state.dataUsage}
                                            optionsBarToNegativeNumbThroughtPut={this.state.optionsBarToNegativeNumbThroughtPut}
                                            optionsDoughVolume={this.state.optionsDoughVolume}
                                            totalNumberVolume={this.state.totalNumberVolume}
                                            optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                            typeOfDay={this.state.typeofInterVal}
                                            dataTotalUsage={this.state.dataTotal.dataUsage}
                                            currentSummary={this.state.currentSummary}
                                        />


                                    </div> : this.state.currentSummary === 2 ?
                                        <div className="col-md-12 paddingLRCard">

                                            <Connectivity
                                                dataConnect={this.state.dataConnect}
                                                totalNumberVolume={this.state.totalNumberVolume}
                                                optionsBarToNegativeNumb={this.state.optionsBarToNegativeNumb}
                                                optionsBarToNegativeNumbThroughtPut={this.state.optionsBarToNegativeNumbThroughtPut}
                                                typeOfDay={this.state.typeofInterVal}
                                                dataTotalConnect={this.state.dataTotal.dataConnect}
                                                currentSummary={this.state.currentSummary}
                                            />


                                        </div>
                                        : null


                        }
                    </div>


                </div>

            </div>



        )
    }
}
