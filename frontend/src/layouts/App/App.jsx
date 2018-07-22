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

// routes (array of objects)
import appRoutes from "routes/appRoutes.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";


class App extends React.Component {
  
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    } 
  }


  handleDrawerToggle = () => this.props.mobileOpen(!this.props.mobile);

  render() {
    const {mobile, classes, ...rest } = this.props;
    
    let userToken  = localStorage.getItem('token');
    
    // filter routes from routes array for sidebar, header and footer
    const routesForSidebarFooterHeader = appRoutes.filter(route=>{
      if(route.token === !!userToken) return route
      }) 

    return (
    
      <div className={classes.wrapper}>
        
        <Sidebar 
          routes={routesForSidebarFooterHeader}
          logoText={"Home Exprenses"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobile}
          color="blue"
          {...rest}/>
        
        <div className={classes.mainPanel} ref="mainPanel">

          <Header
            routes={routesForSidebarFooterHeader}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}/>
            
          <div className={classes.content}>
            <div className={classes.container}>
                 {// routes for rendering in App
                 <Switch>
                  {appRoutes.map((prop, key) => {
                    if (prop.path=='/') {
                      return <Redirect to={userToken ?'/dashboard':'/signin'} key={key}/>
                    } 
                    if(prop.token === !!userToken) {
                      return <Route path={prop.path} component={prop.component} key={key} />;
                    }
                  })}
                </Switch>}
            </div>
          </div>

          <Footer routes = {routesForSidebarFooterHeader}/>

        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  mobile: state.mobile

})
const mapActionToProps = {
  mobileOpen,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(dashboardStyle)(App));
