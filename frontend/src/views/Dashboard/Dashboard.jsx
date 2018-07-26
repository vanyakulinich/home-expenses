import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import getUserData from '../../actions/getUserData.jsx';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import {TextField, MenuItem, List, ListItem} from "@material-ui/core";
import SimpleSelect from '../../components/Select/SimpleSelect.jsx'

// core components
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import addNewExpense from '../../actions/addNewExpense.jsx'

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    if(!this.props.data) this.props.getUserData()
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  categoriesList = ()=>{
    return (<List>

          </List>)
  }

  addExpense=()=>{
   let inputs = document.querySelectorAll('input')
   
   console.log(inputs[0].value)
   let value = +inputs[2].value
   console.log(value)
   let body = {
     id: inputs[0].value,
     description: inputs[1].value,
     value: +value.toFixed(2)
   }
    this.props.addNewExpense('PUT', body)
  }

  clearInput = (e)=>{
    e.target.value = ''
  }


  

  render() {
    const { classes, userData, categList} = this.props;
   
    return (
      <div>
        <Card>
          <CardHeader color='info'>
            <h3>New expenses </h3>   
            <h5>Please enter new expenses here</h5>         
          </CardHeader>
          <CardBody className = {classes.expensesPerformanse}>
          <SimpleSelect categList= {categList}/>
        

             


            <TextField
            InputProps={{defaultValue:'Description'}}
            onClick={this.clearInput}/>
            
            
            <TextField label='Value'
              InputProps={{defaultValue:'UAH'}}
              onClick={this.clearInput}
            />



            <Button color="primary"
            onClick={this.addExpense}>ADD EXPENSES</Button>
          </CardBody>
        </Card>
        <Card>
          <CardHeader color='info'>
            <h3>Latest expenses</h3>  
            <h5>Here are 20 latest expenses</h5>         
          </CardHeader>
          <CardBody>
            <Table
                tableHeaderColor="primary"
                tableHead={["Date", "Category", "Expenses", "Value, UAH"]}
                tableData={[
                  ["16.07.2018", "Food", "bought milk", "30"],
                  ["15.07.2018", "Transport", "", "20"],
                ]}
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
  expenses: state.expenses,
  categList: state.data.categList,
  data: state.data
})

const mapActionsToProps = {
  getUserData,
  addNewExpense
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(dashboardStyle)(Dashboard));

