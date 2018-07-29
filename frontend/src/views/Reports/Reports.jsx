import React, {Component} from "react";
import {connect} from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import getUserData from '../../actions/getUserData.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/TableReports.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import PeriodPicker from '../../components/Calendar/PeriodPicker.jsx'

const styles = {
    dateNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    dateButtons:{
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    buttons: {
        width: '25px'
    },
    buttonsPeriods: {
        width: '80px'
    }

}
class Reports extends Component {

    state={
        startDate: null,
        endDate:null
    }

    componentDidMount() {
        if(!this.props.categories) this.props.getUserData()
        let defaultDate = `${new Date()}`
        this.setState({
            startDate: this.formatDate(defaultDate),
            endDate: this.formatDate(defaultDate)
        })
    }

    // date navigation functions, working with component PeriodPicker
    formatDate=(date)=>{
        let formatedDate = `${date}`
        console.log(formatedDate)
        formatedDate = formatedDate.split(' ')
        return `${formatedDate[0]} ${formatedDate[1]} ${formatedDate[2]} ${formatedDate[3]}`
    }
    getPeriod=(data)=>{
        console.log(data)
        this.setState({
            startDate: this.formatDate(data.start),
            endDate: this.formatDate(data.end)
        })
    }
    buttonsPeriod=(data)=>{
        this.getPeriod(data)
    }
    
    // displaying results
    



    render(){
        const {classes, categories} = this.props
        const table = categories ? categories : []
        return(
            <Card>
            <CardHeader color='info'>
                <h3>Expenses reports</h3>   
                <h5>Here below are some expenses reports</h5>         
            </CardHeader>
            <CardBody >
                <div className={classes.dateNav}>
                
                    <div> {this.state.endDate} / {this.state.startDate}</div>
                    <div className={classes.dateButtons}>

                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} move='left'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} move='right'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} day={true} name='DAY'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} week={true} name='WEEK'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} month={true} name='MONTH'/>
                        <PeriodPicker getPeriod={this.getPeriod} period={true} name='PERIOD'/>
                        
                    </div>
                </div>
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Category", "Expenses value, UAH"]}
                    tableData={table}
                    inside={false}
                />
            </CardBody>
        </Card>
        )
    }
}

const mapStateToProps = state=>({
    categories: state.data.userCategories
})

const mapActionsToProps = {
    getUserData
  }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Reports));