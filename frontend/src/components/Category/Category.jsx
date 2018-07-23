import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {TextField, ListItem, Divider, Dialog} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories';

import FormDialog from 'components/FormDialog/FormDialog.jsx'

// reusable category component

class Category extends Component{

    configParams=(dir, name)=>({
        name: name || this.props.categoryName,
        id: this.props.id,
        parent: this.props.parent || null,
        direction: dir || null,
        position: this.props.position
    })

    deleteCategory = ()=>this.props.configCategories('DELETE', this.configParams())

    categoryUp = ()=>this.props.configCategories('PUT', this.configParams(true))

    categoryDown = ()=>this.props.configCategories('PUT', this.configParams(false))
    
    saveCategory = ()=>this.props.configCategories('PUT', this.configParams())

    addSubCategory = ()=>{
        this.props.configCategories('POST', {name:'New Category', parent: this.props.categoryName})
    }

    changeCatName = (name)=>{
        this.props.configCategories('PUT', this.configParams(null, name), '/rename')
    }
    render(){
        const {categoryName} = this.props;
        

        return(
            <Fragment>
                <FormDialog 
                    name = {categoryName}
                    save = {this.changeCatName}
                />
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
                 
         </Fragment>
        )
    }
}

const mapActionsToProps = ({
    configCategories
})


export default connect(null, mapActionsToProps)(Category);