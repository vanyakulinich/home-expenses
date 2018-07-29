import React, {Component} from "react";
import {connect} from 'react-redux';
import 'react-dates/initialize';

import getUserData from '../../actions/getUserData.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/TableReports.jsx";
import PeriodPicker from '../../components/Calendar/PeriodPicker.jsx'

import recurse from '../../functions/reportsRecurse.jsx'

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
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    }

}

class Reports extends Component {

    state={
        startDate: null,
        endDate:null,
        list: null
    }

    componentDidMount() {
        if(!this.props.categories) this.props.getUserData()
        let defaultDate = `${new Date()}`
        this.setState({
            startDate: this.formatDate(defaultDate),
            endDate: this.formatDate(defaultDate),
        })  
    }

    // date navigation functions, working with component PeriodPicker
    formatDate=(date)=>{
        let formatedDate = `${date}`
        formatedDate = formatedDate.split(' ')
        return `${formatedDate[0]} ${formatedDate[1]} ${formatedDate[2]} ${formatedDate[3]}`
    }

    buttonsPeriod=(data)=>{
        this.getPeriod(data)
    }

    getPeriod=(data)=>{
        this.setState({
            startDate: this.formatDate(data.start),
            endDate: this.formatDate(data.end)
        })
        let start = (typeof(data.dayStart)==='number') ? data.dayStart : data.dayStart.getTime()
        let end =  (typeof(data.dayEnd) ==='number') ? data.dayEnd : data.dayEnd.getTime()

        let filteredExpenses = this.props.expenses ? this.props.expenses.filter(el=>{
            return el.creationDate > start && el.creationDate < end
        }) : []
        console.log(filteredExpenses)
        let bufferAr = JSON.parse(JSON.stringify(filteredExpenses))
        // recursive organize of report to display
        
        let result = recurse(bufferAr, null)
        this.setState({list: result})
        console.log(result)
    }

    render(){
        const {classes} = this.props;
        const{list} = this.state;
        return(
            <Card>
            <CardHeader color='info'>
                <h3>Expenses reports</h3>   
                <h5>Here below are some expenses reports</h5>         
            </CardHeader>
            <CardBody>
                <div className={classes.dateNav}> 
                    <div> {this.state.startDate} / {this.state.endDate}</div>
                    <div className={classes.dateButtons}>

                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} move='left'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} move='right'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} day={true} name='DAY'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} week={true} name='WEEK'/>
                        <PeriodPicker buttonsPeriod={this.buttonsPeriod} month={true} name='MONTH'/>
                        <PeriodPicker getPeriod={this.getPeriod} period={true} name='PERIOD'/>
                        
                    </div>
                </div>
                {   this.state.list && this.state.list.length>0 ? 
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["Category", "Expenses value, UAH"]}
                        tableData={list}
                        inside={false}
                    /> :
                    <div className={classes.message}>
                        {this.state.list ? 
                            'No expenses in this period' :
                                'Please choose period to see report'} 
                    </div>
                }         
            </CardBody>
        </Card>
        )
    }
}

const mapStateToProps = state=>({
    expenses: state.data.userExpenses
})

const mapActionsToProps = {
    getUserData
  }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Reports));