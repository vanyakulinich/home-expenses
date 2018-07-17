/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import mobileOpen from '../../actions/mobileOpen.jsx'
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key}/>;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  
  handleDrawerToggle = () => this.props.mobileOpen(!this.props.mobile);

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if(this.props.mobileOpen){
        this.handleDrawerToggle(false)
      }
    }
  }

  render() {
    const {token, mobile, classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Home Exprenses"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobile}
          color="blue"
          {...rest}/>
        
        <div className={classes.mainPanel} ref="mainPanel">  
        <Header
          routes={dashboardRoutes}
          handleDrawerToggle={this.handleDrawerToggle}
          {...rest}/>
            
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          
          <Footer routes = {dashboardRoutes}/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  token: state.token,
  mobile: state.mobile

})
const mapActionToProps = {
  mobileOpen: mobileOpen
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(dashboardStyle)(App));
