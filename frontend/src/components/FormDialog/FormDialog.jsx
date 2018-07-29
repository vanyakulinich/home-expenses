import React, {Fragment, Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends Component {
  state = {
    open: false,
  };

  inputProp =()=>( {
    disableUnderline: true,
    defaultValue: this.props.name,
  })

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  clickOk = ()=>{
    let input = document.querySelector('[type="text"]')
    this.props.save(input.value)
    this.handleClose()
  }

  render() {

    const propsForInput = this.inputProp()
    return (
      <Fragment>
        <Button onClick={this.handleClickOpen}>{this.props.name}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Category Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              InputProps = {propsForInput}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.clickOk} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}