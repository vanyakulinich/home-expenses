import React from 'react'
// import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import {Route, Redirect, Switch} from 'react-router-dom';
import dashboardRoutes from './dashboard.jsx'

// const indexRoutes = [{ path: "/", component: Dashboard }];

// const indexRoutes = { path: "/", component: Dashboard };
const SwitchRoutes =(token)=> (
    <Switch>
      {
        dashboardRoutes.map((prop, key) => {
          if (prop.path=='/') {
            return <Redirect to={token ?'/dashboard':'/signin'} key={key}/>
          } 
          if(prop.token === !!localStorage.getItem('token')) {
            return <Route path={prop.path} 
                  component={prop.component} 
                  key={key} />;
          }
      })
      }
    </Switch>
  );

export default SwitchRoutes;
