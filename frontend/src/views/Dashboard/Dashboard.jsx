import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import getUserData from '../../actions/getUserData.jsx';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import {TextField, MenuItem, List, ListItem} from "@material-ui/core";

// core components
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    if(!this.props.userData) this.props.getUserData()
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  categoriesList = ()=>{
    return 
  }

  render() {
    const { classes, userData} = this.props;
    console.log(userData)
    return (
      <div>
        <Card>
          <CardHeader color='info'>
            <h3>New expenses </h3>   
            <h5>Please enter new expenses here</h5>         
          </CardHeader>
          <CardBody>
            {userData ? null : <span>no data</span>}
            <TextField
              id="select-currency"
              select
              // label="Select Category"
              className={classes.textField}
              value={this.state.currency}
              // onChange={this.handleChange('currency')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Select Category"
              margin="normal"
            >
              <List>
                {this.categoriesList}
              </List>
              {/* <MenuItem> Select Category </MenuItem> */}
              {/* {userData.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))} */}
            </TextField>
            <TextField label='Description'/>
            <TextField label='Value' value='UAH'/>
            <Button color="primary">ADD EXPENSES</Button>
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
  userData: state.userData
})

const mapActionsToProps = {
  getUserData
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(dashboardStyle)(Dashboard));

