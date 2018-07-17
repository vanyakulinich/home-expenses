import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

const Reports = ()=>{
    return (
        <Card>
            <CardHeader color='info'>
                <h3>Expenses reports</h3>   
                <h5>Here is some expenses reports</h5>         
            </CardHeader>
            <CardBody>
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


export default Reports;