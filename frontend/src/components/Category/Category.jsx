import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {TextField, ListItem, Divider} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories.jsx';


// reusable category component

class Category extends Component{

    deleteCategory = ()=>{
        console.log(this.props.id)
        this.props.configCategories('DELETE', {id: this.props.id})
    }

    renameCategory=(e)=>{
        console.log(e.target.value)
        console.log(e.target)
    }

    saveCategory = ()=>{
        this.props.configCategories('PUT', {name: this.props.categoryName})
    }

    addSubCategory = ()=>{
        this.props.addSubCategory(this.props.categoryName)
    }

    render(){
        const {categoryName} = this.props;
        const inputProps = {
            disableUnderline: true,
            defaultValue: categoryName
        }

        return(
            <Fragment>
            <ListItem>
                <Fragment>
                 <TextField InputProps = {inputProps}/>
                 <Button onClick={this.renameCategory}>save</Button>
                </Fragment>
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
                 <Button color="info" onClick={this.addSubCategory}>
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