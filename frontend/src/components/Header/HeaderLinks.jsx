import React, {Fragment} from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import isToken from '../../actions/isToken.jsx'
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

  signOut = ()=>{
    this.props.IsToken(null)
  }

  render() {
    const {classes, token} = this.props;
    const { open } = this.state;
    return (
        <div className={classes.searchWrapper}>
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
                    token ? (
                      <MenuList role="menu">
                          <MenuItem
                          onClick={this.handleClose}
                          className={classes.dropdownItem}
                        >
                          <Link to='/' onClick = {this.signOut}>Sign out</Link>
                        </MenuItem>
                      </MenuList>
                    ) : (
                      <MenuList role="menu">
                          <MenuItem
                          onClick={this.handleClose}
                          className={classes.dropdownItem}
                        >
                          <Link to='/signin'>Sign In</Link>
                        </MenuItem>
                        <MenuItem
                          onClick={this.handleClose}
                          className={classes.dropdownItem}
                        >
                          <Link to='/signup'>Sign Up</Link>
                        </MenuItem>
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
  token: state.token
})
const mapActionsToProps = {
  isToken
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(headerLinksStyle)(HeaderLinks));
