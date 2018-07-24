import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {TextField, ListItem, Divider, Dialog} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories';

import FormDialog from 'components/FormDialog/FormDialog.jsx'

// reusable category component

class Category extends Component{

    configParams=(dir, name, parent)=>({
        name: name || this.props.categoryName,
        id: this.props.id,
        parent: parent || this.props.parent,
        direction: dir || null,
        position: this.props.position
    })

    deleteCategory = ()=>this.props.configCategories('DELETE', this.configParams())

    categoryUp = ()=>this.props.configCategories('PUT', this.configParams(true))

    categoryDown = ()=>this.props.configCategories('PUT', this.configParams(false))
    
    saveCategory = ()=>this.props.configCategories( 'PUT', this.configParams())

    addSubCategory = ()=>{
        let parent = this.props.categoryName
        this.props.configCategories('POST', this.configParams(null, 'New Category', parent))
        
    }

    changeCatName = (name)=>{
        this.props.configCategories('PUT', this.configParams(null, name), '/rename')
    }
    render(){
        const {categoryName,color} = this.props;
        const buttonColor = color ? color : 'info'
        return(
            <Fragment>
                <FormDialog 
                    name = {categoryName}
                    save = {this.changeCatName}
                />
                 <Button color={buttonColor} onClick={this.categoryUp}>
                     <ArrowUpward/>
                 </Button>
                 <Button color={buttonColor} onClick={this.categoryDown}>
                     <ArrowDownward/>
                 </Button>
                 <Button color="warning"
                         onClick={this.deleteCategory}
                         name ={categoryName}>
                     <Clear/>
                 </Button>
                 <Button color={buttonColor} onClick={this.addSubCategory}>
                     <Loupe/>
                 </Button>
                 
         </Fragment>
        )
    }
}


const mapActionsToProps = ({
    configCategories
})


export default connect(null, mapActionsToProps)(Category);