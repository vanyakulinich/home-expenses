import React from 'react'
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import {Route, Redirect, Switch} from 'react-router-dom';
import dashboardRoutes from './dashboard.jsx'

const indexRoutes = [{ path: "/", component: Dashboard }];


const SwitchRoutes =()=> (
    <Switch>
      {dashboardRoutes.map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key}/>;
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  );

export default indexRoutes;
