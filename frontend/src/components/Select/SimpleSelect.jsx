import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 0,
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
  };

  handleChange = event => {
    this.setState({ 
      [event.target.name]: event.target.value,
    });
  };

  addId=(event)=>{
    this.setState({
      catid: event.target.catid
    })
  }

  render() {
    const { classes, categList} = this.props;

    return (
      <form className={classes.root} autoComplete="off">
       <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Select Category</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          > { categList ?
              categList.map((el, key)=>{
                return <MenuItem value={key} key={key}>{el.name}</MenuItem>
              }) : null
          }
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = state=>({
  categList: state.data.categList,
})

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(SimpleSelect));