import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Button from 'components/CustomButtons/Button.jsx'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import {Close} from "@material-ui/icons";

import configCategories from '../../actions/configCategories.jsx'
import configParams from '../../functions/configFetch.jsx'

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialogHead: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  closeDialog: {
    cursor: 'pointer'
  }
};

class SimpleDialog extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  clickListitem = ()=>{
    this.handleListItemClick()
  }

  handleListItemClick = (value, id, name) => {
    this.props.onClose(value);
    this.props.conf(configParams(value, id, this.props.parentid))
  };

  render() {
    const { classes, open} = this.props;
    const {list} = this.props
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <div className={classes.dialogHead}>
          <DialogTitle id="simple-dialog-title">Chose a subcategory to add </DialogTitle>
          <Close onClick={this.handleClose} className={classes.closeDialog}/>
        </div>
        <div>
          <List>
            {list.length ? 
              list.map(item => (
              <ListItem button onClick={()=>this.handleListItemClick(item._id, item.name)} key={item._id}>
                <ListItemText primary={item.name} />
              </ListItem>
            )) :
            <ListItem>
                <ListItemText primary={'No categories to add for this category. Please add new category'} />
              </ListItem>
          
          }
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
    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <Button color='info' 
                onClick={this.handleClickOpen}>
            *
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