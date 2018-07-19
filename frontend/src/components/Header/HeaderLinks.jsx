import React, {Fragment} from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import signOutUser from '../../actions/signOutUser.jsx'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  signOut=()=>this.props.signOutUser()


  render() {
    const {classes, user} = this.props;
    const { open } = this.state;
    return (
        <div className={classes.searchWrapper}>
        <span>{user}</span>
        <Manager className={classes.manager}>
          <Target>
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
            >
              <Person className={classes.icons} />
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }>

            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  {
                    user ? (
                      <MenuList role="menu">
                        <Link to='/signin' onClick={this.signOut}>
                          <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>
                            Sign out
                          </MenuItem>
                        </Link>
                      </MenuList>
                    ) : (
                      <MenuList role="menu">
                        <Link to='/signin'>
                          <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>
                            Sign In
                          </MenuItem>
                        </Link>
                        <Link to='/signup'>
                          <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>
                            Sign Up
                          </MenuItem>
                        </Link>
                      </MenuList>
                    )
                  }
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

const mapStateToProps = state=>({
  user: state.user
})
const mapActionsToProps = {
  signOutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(headerLinksStyle)(HeaderLinks));
