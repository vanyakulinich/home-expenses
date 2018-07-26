import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";
import { Object } from "parse";

function CustomTable({ ...props }) {
 
  const { classes, tableHead, tableData, tableHeaderColor, reports} = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          { reports ?
            tableData.map((prop, key) => {
              if(prop.children) {
                return (
                  <TableRow key={key}>
                    <TableCell className={classes.tableCell} key={1+key*2}>
                        {prop.name}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={1+key*3}>
                        <CustomTable
                        tableHeaderColor="primary"
                        // tableHead={["Category", "Expenses value, UAH"]}
                        tableData={prop.children}
                        reports={true}
                        
                        />
                      </TableCell>
                  </TableRow>
                )
              }
              return (
                <TableRow key={key}>
                      <TableCell className={classes.tableCell} key={1+key*2}>
                        {prop.name}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={1+key*3}>
                        {prop.value}
                      </TableCell>
                  
                </TableRow>
              );
            }) : 
            tableData.map((prop, key) => {
                return (
                  <TableRow key={key}>
                    {prop.map((prop, key) => {
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
          

          }
        </TableBody>
      </Table>
    </div>
  );
}
// for dashboard


CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
