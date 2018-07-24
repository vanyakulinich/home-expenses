import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {TextField, ListItem, Divider, Dialog} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories';

import FormDialog from 'components/FormDialog/FormDialog.jsx';
import AlertDialog from 'components/AlertDialog/AlertDialog.jsx';
import SimpleDialogDemo from 'components/SimpleDialog/SimpleDialog.jsx'

// reusable category component

class Category extends Component{

    configParams=(dir, name, parent)=>({
        name: name || this.props.categoryName,
        id: this.props.id,
        parent: parent || this.props.parent,
        direction: dir || null,
        position: this.props.position
    })

    deleteCategory = (name)=>this.props.configCategories('DELETE', this.configParams(null, name))

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
        const {categoryName, child} = this.props;
        const buttonColor = child ? 'primary' : 'info'
        return(
            <Fragment>
                <FormDialog 
                    name = {categoryName}
                    save = {this.changeCatName}
                />
                <div>
                 <Button color={buttonColor} onClick={this.categoryUp}>
                     <ArrowUpward/>
                 </Button>
                 <Button color={buttonColor} onClick={this.categoryDown}>
                     <ArrowDownward/>
                 </Button>
                 <AlertDialog 
                    delete = {this.deleteCategory}
                    name = {categoryName} />
                    
                    {child ? 
                        null : 
                        <SimpleDialogDemo 
                            list = {this.props.userData.filter(item=>item.name!==categoryName)}
                            color={buttonColor}/>}
                </div>
         </Fragment>
        )
    }
}
const mapStateToProps = state=>({
    userData: state.userData
})

const mapActionsToProps = ({
    configCategories
})


export default connect(mapStateToProps, mapActionsToProps)(Category);