import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import getUserData from '../../actions/getUserData.jsx';


// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import {TextField, MenuItem, List, ListItem} from "@material-ui/core";
import SimpleSelect from '../../components/Select/SimpleSelect.jsx'

// core components
import Table from "components/Table/TableDashboard.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import addNewExpense from '../../actions/addNewExpense.jsx'

import IntegrationAutosuggest from 'components/Autocomplete/Autocomplete.jsx'

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    if(!this.props.expenses) this.props.getUserData()

  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  addExpense=()=>{
   let inputs = document.querySelectorAll('input')
   let value = +inputs[2].value
   let body = {
     id: inputs[0].value,
     description: inputs[1].value,
     value: +value.toFixed(2)
   }
    this.props.addNewExpense('PUT', body)
    inputs.forEach(el=>el.value='')
  }

  clearInput = (e)=>{
    e.target.value = ''
  }

  expensesList=(expenses)=>{
    if(!expenses) return []
    let table = expenses.map(item=>{
      return [
          item.date,
          item.category,
          item.description,
          item.value+''
      ]
    })
    return table
  }

 

  render() {
    const { classes, expenses, categList} = this.props;
    const table = this.expensesList(expenses)
    return (
      <div>
        <Card>
          <CardHeader color='info'>
            <h3>New expenses </h3>   
            <h5>Please enter new expenses here</h5>         
          </CardHeader>
          <CardBody className = {classes.expensesPerformanse}>
          <SimpleSelect categList= {categList}/>
        
            <IntegrationAutosuggest/>
           
            <TextField label='Value'
              InputProps={{defaultValue:'UAH'}}
              onClick={this.clearInput}
            />

            <Button color="primary"
            onClick={this.addExpense}>ADD EXPENSES</Button>
          </CardBody>
          {/* <IntegrationDownshift/> */}
        </Card>
        <Card>
          <CardHeader color='info' className={classes.zindex}>
            <h3 className={classes.zindex}>Latest expenses</h3>  
            <h5 className={classes.zindex}>Here are 20 latest expenses</h5>         
          </CardHeader>
          <CardBody>
            <Table
                tableHeaderColor="primary"
                tableHead={["Date", "Category", "Expenses", "Value, UAH"]}
                tableData={table}
              />
          </CardBody>
        </Card>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state=>({
  expenses: state.data.userExpenses,
  categList: state.data.categList,
})

const mapActionsToProps = {
  getUserData,
  addNewExpense
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(dashboardStyle)(Dashboard));

