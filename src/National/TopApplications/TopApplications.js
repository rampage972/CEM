import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import { callAPI } from '../../service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown,faExclamationCircle, faPause, faPlay, faFileExport} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import ReactExport from "react-data-export"
import { CSVLink } from "react-csv"
import './TopApplications.css'
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import DateFnsUtils from '@date-io/date-fns';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
export default class TopApplications extends Component {
    constructor() {
        super()
        function parseIsoDatetime(dtstr) {
            var dt = dtstr.split(/[: T-]/).map(parseFloat);
            return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
        }
        this._isMounted = false
        this.state = {
            anchorEl: null,
            currentSortBy:"vol_in",
            isSettedRemaining: true,
            dataToExport: [],
            intervalId: 0,
            remainingTime: 60,
            defaultRemainingTime: 60,
            pauseInterval: false,
            isSetInterval: false,
            spinnerLoading: true,
            spinnerTest: true,
            currentMaxRow: 5,
            updateTable: false,
            startDate: parseIsoDatetime("2019-12-08T00:00:00.000Z"),
            endDate: parseIsoDatetime("2019-12-08T23:59:59.000Z"),
            requestTopAll: {
                "queryType": "topN",
                "dataSource": "nio20191208FULL",
                "dimension": "application_name",
                "descending": "true",
                "metric":
                {
                    "ordering": "numeric",
                    "metric": "vol_in"
                },
                "threshold": 5,
                "granularity": "all",
                "aggregations": [
                    {
                        "type": "longSum",
                        "name": "vol_in",
                        "fieldName": "Rvol_in"
                    },
                    {
                        "type": "longSum",
                        "name": "Sumvol_in",
                        "fieldName": "Rvol_in"
                    },
                    {
                        "type": "longSum",
                        "name": "Sumvol_out",
                        "fieldName": "Rvol_out"
                    },
                    {
                        "type": "longSum",
                        "name": "vol_out",
                        "fieldName": "Rvol_out"
                    },
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
                    },
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
                    },
                    {
                        "type": "cardinality",
                        "name": "distinct_msisdn",
                        "fields": ["msisdn"],
                        "byRow": false
                    }


                ],
                intervals: ["2019-12-08T00:00:00.000Z/2019-12-08T23:59:59.000Z"]
            }
            ,
            dataApplication: [],
            rawDataApplication: [],
            totalTime: 86400,
            sortData: {
                sortVolume: true,
            },
            delayShowTable:false
        }
    }
    componentDidMount = () => {
        this._isMounted = true
        this.setState({ updateTable: true})
        setTimeout(()=>this.setState({delayShowTable:true}),4000)
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate = () => {
        if( this._isMounted){
            if (this.state.updateTable ) {
                
                this.setState({updateTable:false, spinnerLoading:true})
                this.updateTable()
            }
            else {
                if (this.state.spinnerLoading === false) {
                    if (!this.state.pauseInterval && !this.state.isSetInterval) {
                        this.setState({ isSetInterval: true })
                        let defaultRemainingTime= this.state.defaultRemainingTime
                        let intervalId = setTimeout(() => {
                            this.setState({updateTable: true, spinnerLoading: true, remainingTime: defaultRemainingTime, isSetInterval: false })
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
    }

    updateTable = () => {
        callAPI(this.state.requestTopAll).then(res => {
           
            if (this._isMounted) { 
                let data = res.data[0].result
                let rawData = []
                for (let i = 0; i < data.length; i++) {
                    let item = {
                        Volume: this.bytesToSize(data[i].vol_in + data[i].vol_out),
                        IntLat: Math.round(data[i].Sumclient_delay / data[i].Sum_client_delayNotZero),
                        ExLat: Math.round(data[i].SumRstd / data[i].Sum_stdNotZero),
                        IntPLoss: (100 * (data[i].rxmit_pkt_in / data[i].pkt_in)).toFixed(1),
                        ExtPLoss: (100 * (data[i].rxmit_pkt_out / data[i].pkt_out)).toFixed(1),
                        ActiveSub: Math.round(data[i].distinct_msisdn).toLocaleString('ja-JP'),
                        application_name: data[i].application_name,
                        Ul: this.bitsToSize(data[i].Sumvol_out / this.state.totalTime),
                        Dl: this.bitsToSize(data[i].Sumvol_in / this.state.totalTime)
                    }
                    let rawItem = {
                        Volume: (data[i].vol_in + data[i].vol_out),
                        IntLat: Math.round(data[i].Sumclient_delay / data[i].Sum_client_delayNotZero),
                        ExLat: Math.round(data[i].SumRstd / data[i].Sum_stdNotZero),
                        IntPLoss: (100 * (data[i].rxmit_pkt_in / data[i].pkt_in)).toFixed(1),
                        ExtPLoss: (100 * (data[i].rxmit_pkt_out / data[i].pkt_out)).toFixed(1),
                        ActiveSub: Math.round(data[i].distinct_msisdn).toLocaleString('ja-JP'),
                        application_name: data[i].application_name,
                        Ul: (data[i].Sumvol_out / this.state.totalTime),
                        Dl: (data[i].Sumvol_in / this.state.totalTime)
                    }
                    data[i] = item
                    rawData[i] = rawItem
                 }
                 this.setState({ 
                    dataApplication: data,
                    rawDataApplication: rawData,
                    spinnerLoading:false,
                    updateTable:false 
                })
            }
        }).catch(err => {

        })
    }

    handleChangeMaxRow = (e) => {
        let requestTopAll = Object.assign({}, this.state.requestTopAll)
        requestTopAll.threshold = e.target.value
        this.setState({ currentMaxRow: e.target.value, requestTopAll, updateTable: true })
    }
    handleChangeSortBy = (e) => {
        this.setState({ currentSortBy: e.target.value})
    }

    bytesToSize = (bytes) => {

        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];

    }

    bitsToSize = (bytes) => {
        let sizes = ['Bits', 'Kb', 'Mb', 'Gb', 'Tb'];
        if (bytes == 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];

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
        let second = (endDate.getTime() - startDate.getTime()) / 1000
        this.setState({ totalTime: second })
        startDate = this.changeFormatTime(startDate)
        endDate = this.changeFormatTime(endDate)
        let requestTopAll = Object.assign({}, this.state.requestTopAll)

        requestTopAll.intervals = [startDate + "/" + endDate]

        this.setState({ requestTopAll: requestTopAll, updateTable: true, spinnerLoading: true })

    }

    handleChangePauseInterval = () => {
        let interval = !this.state.pauseInterval
        interval && this.setState({ isSettedRemaining: false })
        this.setState({ pauseInterval: interval })
    }

    setSortedName = () => {
        let dataApplication = Object.assign([], this.state.dataApplication)
        let rawDataApplication = Object.assign([], this.state.rawDataApplication)
        let sortData = Object.assign({}, this.state.sortData)
        let orderList = []
        sortData.sortVolume = !sortData.sortVolume
        this.setState({ sortData })
        if (rawDataApplication.length > 0) {
            if (sortData.sortVolume === false) {
                rawDataApplication.sort((a, b) => {

                    if (a.Volume < b.Volume) {
                        return -1;
                    }
                    if (a.Volume > b.Volume) {
                        return 1;
                    }
                    return 0;
                })
            }
            else {
                rawDataApplication.sort((a, b) => {
                    if (a.Volume > b.Volume) {
                        return -1;
                    }
                    if (a.Volume < b.Volume) {
                        return 1;
                    }
                    return 0;
                })
            }
        }
        
        for (let i = 0; i < rawDataApplication.length; i++) {
            for (let j = 0; j < dataApplication.length; j++) {
                if (dataApplication[j].application_name === rawDataApplication[i].application_name) {
                    orderList.push(j)
                    break
                }
            }
        }
        let tmpdataApplication =[]
        for (let i = 0; i < rawDataApplication.length; i++) {
            tmpdataApplication[i]=dataApplication[orderList[i]]
        }
        dataApplication=tmpdataApplication
        this.setState({ rawDataApplication,dataApplication })
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
        const { currentMaxRow, dataApplication, startDate, endDate,sortData,delayShowTable, pauseInterval,rawDataApplication,isSettedRemaining, currentSortBy, dataToExport ,anchorEl} = this.state
        const { currentWidth } = this.props
        return (
            <div >
                <div className="main-panel" style={{ width: "100%" }}>
                    <div className="panel-header">
                        {this.state.spinnerLoading === true ?
                            <React.Fragment>
                                <div className="overlay overlay-topApp show" style={{ zIndex: 1000 }}></div>
                                <div className="spanner show" >
                                    <div className="loader"></div>
                                    <p style={{ color: "black" }}>Loading data, please be patient.</p>
                                </div>

                            </React.Fragment>
                            : null}
                        {/*MENU CHANGE COMPONENT */}
                        <div className="page-inner border-bottom pb-0 mb-3 pl-4">
                            <div className="d-flex align-items-left flex-column">
                                <div className="nav-scroller d-flex">
                                    <div className="row " style={{ width: "100%" }}>
                                        <div className="col-md-2 d-flex" style={{ justifyContent: "center" }}>
                                            <div className="nav nav-line nav-color-info d-flex align-items-center justify-contents-center">
                                                <p>Max rows : </p>
                                                <FormControl className="selectMaxRow pl-2">
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={currentMaxRow}
                                                        onChange={this.handleChangeMaxRow}
                                                    >
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={10}>10</MenuItem>
                                                        <MenuItem value={20}>20</MenuItem>
                                                        <MenuItem value={30}>30</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex" style={{ justifyContent: "center" }}>
                                            <div className="nav nav-line nav-color-info d-flex align-items-center justify-contents-center">
                                                <p>Sort by : </p>
                                                <FormControl className="selectSortBy pl-2">
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={currentSortBy}
                                                        onChange={this.handleChangeSortBy}
                                                    >
                                                        <MenuItem value={"vol_in"}>Volume</MenuItem>
                                                        <MenuItem value={"Int-Lat"}>Internal Latency</MenuItem>
                                                        <MenuItem value={"Ext-Lat"}>External Latency</MenuItem>
                                                        <MenuItem value={"Int-PLoss"}>Internal Package Loss</MenuItem>
                                                        <MenuItem value={"Ext-PLoss"}>External Package Loss</MenuItem>
                                                        <MenuItem value={"UL"}>UpLink ThroughPut</MenuItem>
                                                        <MenuItem value={"DL"}>DownLink ThroughPut</MenuItem>
                                                        <MenuItem value={"ActiveSub"}>ActiveSub</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="col-md-6 content-middle">
                                            <div className="row" style={{ padding: "10px 0" }}>
                                                <div className="col-md-3 content-middle">
                                                    <span>
                                                        Date Range
                                                    </span>
                                                </div>
                                                <div className={"col-md-3"} >

                                                    {currentWidth <= 991 ? <p>Start Date</p> : null}

                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <Grid container justify="space-around" >
                                                            <DatePicker
                                                                inputProps={{ style: { textAlign: 'center', cursor: 'pointer' } }}
                                                                inputVariant="outlined"
                                                                format="MM/dd/yyyy"
                                                                className="dateTimePicker"
                                                                value={startDate}
                                                                onChange={this.handleChangeStartDate}

                                                            /></Grid>
                                                    </MuiPickersUtilsProvider>
                                                </div>
                                                <div className="col-md-1 content-middle">
                                                    <span style={{ fontSize: "50px" }}>-</span>
                                                </div>
                                                <div className={"col-md-3"} >
                                                    {currentWidth <= 991 ? <p>End Date</p> : null}
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <Grid container justify="space-around">
                                                            <DatePicker
                                                                inputProps={{ style: { textAlign: 'center', cursor: 'pointer' } }}
                                                                inputVariant="outlined"
                                                                format="MM/dd/yyyy"
                                                                id="outlined-basic"
                                                                className="dateTimePicker"
                                                                value={endDate}
                                                                onChange={this.handleChangeEndDate}

                                                            />

                                                        </Grid>
                                                    </MuiPickersUtilsProvider>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="col-md-2 content-middle">
                                        {currentWidth>768?
                                            <div className="row countdownTimer">
                                            {rawDataApplication?
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
                                                            <CSVLink data={rawDataApplication} filename={"TopApplication-ExportData.csv"}>
                                                                <button style={{ fontSize: "1.25em" }}>CSV</button>
                                                            </CSVLink>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => this.closeSelectFileExport()} >
                                                            <ExcelFile element={<button>XLSX</button>} filename={"TopApplication-ExportData"}>
                                                                <ExcelSheet data={rawDataApplication} name="Dashboard">
                                                                    <ExcelColumn label="application_name" value="application_name" />
                                                                    <ExcelColumn label="Volume" value="Volume" />
                                                                    <ExcelColumn label="IntLat" value="IntLat" />
                                                                    <ExcelColumn label="ExLat" value="ExLat" />
                                                                    <ExcelColumn label="ActiveSub" value="ActiveSub" />
                                                                    <ExcelColumn label="IntPLoss" value="IntPLoss" />
                                                                    <ExcelColumn label="ExtPLoss" value="ExtPLoss" />
                                                                    <ExcelColumn label="Ul" value="Ul" />
                                                                    <ExcelColumn label="Dl" value="Dl" />

                                                                </ExcelSheet>

                                                            </ExcelFile>
                                                        </MenuItem>
                                                    </Menu>

                                                </div>
                                            </div>
                                            :null}
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
                                                <div className="col-md-4 ">
                                                {!this.state.spinnerLoading ?
                                                    <div style={{height:"103px"}}>
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
                                        :null}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {delayShowTable?
                    <div className="container-fluid" style={{ minHeight: "56vh" }}>
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="tableTopApp">
                                            <table className="table table-striped table-hover">
                                            <thead className="thead-dark">
                                                <tr>

                                                    <th scope="col" className="tableTopApp-th">#</th>
                                                    <th scope="col" className="tableTopApp-th headcol">Application
                                                       
                                                    </th>
                                                    <th scope="col" className="tableTopApp-th">
                                                    {sortData.sortVolume?
                                                        <button type="button" className="table-header" onClick={() => this.setSortedName()}>
                                                            <span>Volume</span>   
                                                            <FontAwesomeIcon icon={faSortUp}/>
                                                        </button>
                                                        :
                                                        <button type="button" className="table-header" onClick={() => this.setSortedName()}>
                                                            <span>Volume</span> 
                                                            <FontAwesomeIcon icon={faSortDown}/>
                                                        </button>
                                                    }
                                                    </th>
                                                    <th scope="col" className="tableTopApp-th">Int-Lat</th>
                                                    <th scope="col" className="tableTopApp-th">Ext-Lat</th>
                                                    <th scope="col" className="tableTopApp-th">Int-PLoss</th>
                                                    <th scope="col" className="tableTopApp-th">Ext-PLoss</th>
                                                    <th scope="col" className="tableTopApp-th">UL</th>
                                                    <th scope="col" className="tableTopApp-th">DL</th>
                                                    <th scope="col" className="tableTopApp-th">Active Subcribers</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataApplication ? dataApplication.map((item, index) => {
                                                    return (
                                                        <tr key={index} data-tip data-for={index+"tooltip"}>
                                                            <th className="tableTopApp-td" scope="row" >{index + 1}</th>
                                                            <td className="tableTopApp-td headcol">{item.application_name}</td>
                                                            <td className="tableTopApp-td">{item.Volume}</td>
                                                            <td className="tableTopApp-td">{item.IntLat + " ms"}</td>
                                                            <td className="tableTopApp-td">{item.ExLat + " ms"}</td>
                                                            <td className="tableTopApp-td">{item.IntPLoss + " %"}</td>
                                                            <td className="tableTopApp-td">{item.ExtPLoss + " %"}</td>
                                                            <td className="tableTopApp-td">{item.Ul + "/s"}</td>
                                                            <td className="tableTopApp-td">{item.Dl + "/s"}</td>
                                                            <td className="tableTopApp-td">{item.ActiveSub}</td>

                                                        </tr>
                                                    )}):null}

                                            </tbody>
                                        </table>
                                        </div>
                                                    {dataApplication ? dataApplication.map((item, index) => {
                                                    return (
                                                        <ReactTooltip id={index+"tooltip"} aria-haspopup='true' key={index}>
                                                            <div className="container-fluid" >
                                                            <p className="tooltip-notice">
                                                                <FontAwesomeIcon className="mr-1" icon={faExclamationCircle}/>
                                                                 Below is a selected list of KPIs. To view all the KPIs please see the table.
                                                            
                                                            </p> 
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">Application Name</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.application_name}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">Internal Latency</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.IntLat + " ms"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">Total Data Volume</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.Volume}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">External Latency</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.ExLat + " ms"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">UpLink ThroughPut</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.Ul+"/s"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">Internal Package Loss</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.IntPLoss + " %"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">Downlink ThroughPut</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.Dl+"/s"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-8">
                                                                                <span className="tooltipItem-label">External Package Loss</span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <span className="tooltipItem-label">
                                                                                    {item.ExtPLoss + " %"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ReactTooltip> 
                                                    )
                                                }) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :null}

                </div>

            </div>

        )
    }
}
