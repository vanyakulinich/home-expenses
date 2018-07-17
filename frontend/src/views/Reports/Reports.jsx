import React from "react";
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
        justifyContent: 'space-around'
    }
}

const Reports = (props)=>{
    const date = new Date().toLocaleDateString() 
    const {classes} = props
    return (
        <Card>
            <CardHeader color='info'>
                <h3>Expenses reports</h3>   
                <h5>Here is some expenses reports</h5>         
            </CardHeader>
            <CardBody>
                <div className={classes.dateNav}>
                    <h5>{date}</h5>
                    <div>
                        <Button color='primary'>
                            <ChevronLeft/>
                        </Button>
                        <Button color='primary'>
                            <ChevronRight/>
                        </Button>
                        <Button color='primary'>DAY</Button>
                        <Button color='primary'>WEEK</Button>
                        <Button color='primary'>MONTH</Button>
                        <Button color='primary'>PERIOD</Button>
                    </div>
                </div>
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Category", "Expenses value, UAH"]}
                    tableData={[
                    ['Category1', '220.12'], // categories and values will be put here
                    ['Category2', '34.30'],
                    ]}
                />
            </CardBody>
        </Card>
    )
}


export default withStyles(styles)(Reports);