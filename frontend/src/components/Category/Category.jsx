import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {TextField, ListItem, Divider} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories.jsx';

const inputProps = {
    disableUnderline: true
}
// reusable category component

class Category extends Component{

    deleteCategory = ()=>{
        let item = {
            name: this.props.categoryName
        }
        console.log(item)
        console.log(JSON.stringify(item))
        this.props.configCategories('PUT', JSON.stringify(item))
    }

    renameCategory=(e)=>{
        console.log(e.target.value)
    }

    clearInput = (e)=>e.target.value == ''

    render(){
        const {categoryName} = this.props
        return(
            <Fragment>
            <ListItem>
                 <TextField value={categoryName} 
                            InputProps = {inputProps}/>
                 <Button color="info">
                     <ArrowUpward/>
                 </Button>
                 <Button color="info">
                     <ArrowDownward/>
                 </Button>
                 <Button color="warning"
                         onClick={this.deleteCategory}
                         name ={categoryName}>
                     <Clear/>
                 </Button>
                 <Button color="info">
                     <Loupe/>
                 </Button>
             </ListItem>
             <Divider/>
         </Fragment>
        )
    }
}

const mapActionsToProps = ({
    configCategories
})


export default connect(null, mapActionsToProps)(Category);