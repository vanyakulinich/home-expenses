import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Button from 'components/CustomButtons/Button.jsx'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import {Loupe} from "@material-ui/icons";

import configCategories from '../../actions/configCategories.jsx'
import configParams from '../../functions/configFetch.jsx'

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
    console.log(this.props.selectedValue)
  };

  clickListitem = ()=>{
    this.handleListItemClick()
  }

  handleListItemClick = (value, id, name) => {
    this.props.onClose(value);
    console.log(id)
    console.log(value)
    console.log(this.props.parentitem)
    this.props.conf(configParams(value, id, this.props.parentid))
  };

  render() {
    const { classes, onClose, selectedValue, conf, open, ...other } = this.props;
    const {list} = this.props
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Chose a category for subcategory</DialogTitle>
        <div>
          <List>
            {list.map(item => (
              <ListItem button onClick={()=>this.handleListItemClick(item._id, item.name)} key={item._id}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};


const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends Component {
  state = {
    open: false,
    selectedValue: emails[1],
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  addSubCategory = (config)=>{
    this.props.configCategories('POST', 'sub', config)
  }

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <Fragment>
        <Button color='info' 
                onClick={this.handleClickOpen}>
            <Loupe/>
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          list={this.props.list}
          parentitem = {this.props.parentitem}
          conf={this.addSubCategory}
          parentid = {this.props.id}
        />
      </Fragment>
    );
  }
}

const mapActionsToProps = {
  configCategories,
}


export default connect(null, mapActionsToProps)(SimpleDialogDemo);