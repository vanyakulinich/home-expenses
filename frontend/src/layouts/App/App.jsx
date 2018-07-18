// /* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import mobileOpen from '../../actions/mobileOpen.jsx'
import isToken from '../../actions/isToken.jsx'
import redirection from '../../actions/redirect.jsx'
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


class App extends React.Component {
  
  handleDrawerToggle = () => this.props.mobileOpen(!this.props.mobile);

  componentDidMount() {
    // localStorage.getItem('token') && this.getToken()
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;

    }
  }

  getToken = ()=> this.props.isToken(localStorage.getItem('token'))

  render() {
    const {token, mobile, classes, ...rest } = this.props;
    let tokenLocalStorage  = localStorage.getItem('token')
    const routesForRender = dashboardRoutes.filter(route=>{
      if(route.token === !!token) return route
    }) 

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routesForRender}
          logoText={"Home Exprenses"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobile}
          color="blue"
          {...rest}/>
        
        <div className={classes.mainPanel} ref="mainPanel">  
        <Header
          routes={routesForRender}
          handleDrawerToggle={this.handleDrawerToggle}
          {...rest}/>
            
          <div className={classes.content}>
            <div className={classes.container}>
            {
              <Switch>
                 { 
                  dashboardRoutes.map((prop, key) => {
                  if (prop.path=='/') {
                    return <Redirect to={tokenLocalStorage ?'/dashboard':'/signin'} key={key}/>
                  } 
                  
                  // return <Route path={prop.path} render={()=>{
                  //       if(tokenLocalStorage && prop.token) {
                  //         return prop.component
                  //       } else {
                  //         return null
                  //       }
                  //     }}
                  //       key={key} />;


                  return <Route path={prop.path} 
                          component={prop.component} 
                          key={key} />;
                })}
              </Switch>
            }</div>
          </div>
          
          <Footer routes = {routesForRender}/>
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
  mobileOpen,
  isToken,
  redirection,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(dashboardStyle)(App));
