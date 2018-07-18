import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle";

import {Link} from 'react-router-dom';

function Footer({ ...props }) {
  const { classes, routes } = props;
  console.log(routes)
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {routes.map((item)=>{
              if (item.redirect || item.hidden) return null;
              return <ListItem className={classes.inlineBlock} key={item.path}>
                    <Link to={item.path} className={classes.block}>
                      {item.sidebarName}
                    </Link>
                  </ListItem>
              })}
          </List>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
