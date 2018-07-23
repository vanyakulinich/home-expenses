import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {TextField, ListItem, Divider} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories.jsx';


// reusable category component

class Category extends Component{

    deleteCategory = ()=>{
        let params = {
            id: this.props.id,
            parent: this.props.parent || null
        }
        this.props.configCategories('DELETE', params)
    }

    categoryUp = ()=>{
        let params = {
            id: this.props.id,
            parent: this.props.parent || null,
            direction: true,
            position: this.props.position
        }
        this.props.configCategories('PUT', params)
    }

    categoryDown = ()=>{
        let params = {
            id: this.props.id,
            parent: this.props.parent || null,
            direction: false,
            position: this.props.position
        }
        this.props.configCategories('PUT', params)
    }


    saveCategory = ()=>{
        this.props.configCategories('PUT', {name: this.props.categoryName})
    }

    addSubCategory = ()=>{
        this.props.configCategories('POST', {name:'New Category', parent: this.props.categoryName})
    }

    render(){
        const {categoryName} = this.props;
        const inputProps = {
            disableUnderline: true,
            defaultValue: categoryName
        }

        return(
            <Fragment>
            
                <Fragment>
                 <TextField InputProps = {inputProps}/>
                 <Button onClick={this.renameCategory}>save</Button>
                </Fragment>
                 <Button color="info" onClick={this.categoryUp}>
                     <ArrowUpward/>
                 </Button>
                 <Button color="info" onClick={this.categoryDown}>
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
            
             {/* <Divider/> */}
         </Fragment>
        )
    }
}

const mapActionsToProps = ({
    configCategories
})


export default connect(null, mapActionsToProps)(Category);