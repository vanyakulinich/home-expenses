import React, {Component, Fragment} from 'react';
import Button from 'components/CustomButtons/Button.jsx'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Clear} from "@material-ui/icons";

class AlertDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  deleteCategory = ()=>{

      this.props.delete(this.props.name)
      this.handleClose()

  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {isChild} = this.props
    return (
      <Fragment>
        <Button color="warning"
            onClick={this.handleClickOpen}>
            <Clear/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {isChild ? 'This category will be put to upper level. Are you sure?' :
              'This category will be deleted. Are You Sure?' }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.deleteCategory} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default AlertDialog;