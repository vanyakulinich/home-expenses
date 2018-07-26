import React, {Component} from "react";
import {connect} from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import getUserData from '../../actions/getUserData.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

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
        endDate: null
    }

    componentDidMount() {
        if(!this.props.categories) this.props.getUserData()
      }

      defaultDate=()=>{
        let date = `${new Date()}`.split(' ')
        return `${date[0]} ${date[1]} ${date[2]} ${date[3]} / ${date[0]} ${date[1]} ${date[2]} ${date[3]}`
      }


    render(){
        let date = new Date()+''
        const {classes, categories} = this.props
        return(
            <Card>
            <CardHeader color='info'>
                <h3>Expenses reports</h3>   
                <h5>Here is some expenses reports</h5>         
            </CardHeader>
            <CardBody>
                <div className={classes.dateNav}>
                
                    <div>{this.defaultDate()}</div>
                    <div className={classes.dateButtons}>
                        <Button color='primary' 
                        className={classes.buttons}>
                            <ChevronLeft/>
                        </Button>
                        <Button color='primary' className={classes.buttons}>
                            <ChevronRight/>
                        </Button>
                        <Button color='primary' className={classes.buttonsPeriods}
                        >DAY</Button>
                        <Button color='primary' className={classes.buttonsPeriods}>WEEK</Button>
                        <Button color='primary' className={classes.buttonsPeriods}>MONTH</Button>
                        <Button color='primary' className={classes.buttonsPeriods}>PERIOD</Button>
                    </div>
                </div>
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Category", "Expenses value, UAH"]}
                    tableData={categories}
                    reports={true}
                />
            </CardBody>
        </Card>
        )
    }
}

const mapStateToProps = state=>({
    categories: state.data.categories
})

const mapActionsToProps = {
    getUserData
  }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Reports));