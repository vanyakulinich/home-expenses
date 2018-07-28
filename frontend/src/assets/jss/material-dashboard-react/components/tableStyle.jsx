import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "1em"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "0 8px",
    verticalAlign: "middle",
    marginBottom: 0
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  deleted: {
    backgroundColor: '#ffb8b8'
  },
  tableReports: {
    verticalAlign: 'initial',
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "8px 8px 0px 8px",
    fontSize: '15px',
    margin: '0px'
  },
  border: {
    border: '0px',
    verticalAlign: 'initial',
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "8px 8px 0px 8px",
    fontSize: '15px',
    margin: '0px'
  }
 
});

export default tableStyle;
