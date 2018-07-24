import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {TextField, ListItem, Divider, Dialog} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories';

import FormDialog from 'components/FormDialog/FormDialog.jsx';
import AlertDialog from 'components/AlertDialog/AlertDialog.jsx';
import SimpleDialogDemo from 'components/SimpleDialog/SimpleDialog.jsx'

import configParams from '../../functions/configFetch.jsx'

// reusable category component

class Category extends Component{

    deleteCategory = (name)=>(
        this.props.configCategories('DELETE', 'category', configParams(this.props.id, name)))

    categoryUp = ()=>this.props.configCategories('PUT', configParams(true))

    categoryDown = ()=>this.props.configCategories('PUT', configParams(false))

    // addSubCategory = ()=>{
    //     let parent = this.props.categoryName
    //     this.props.configCategories('POST', this.configParams(null, 'New Category', parent))
        
    // }

    renameCategory = (name)=>{
        this.props.configCategories('PUT', 'category', configParams(this.props.id, name))
    }
    render(){
        const {categoryName, child, userData} = this.props;
        const buttonColor = child ? 'primary' : 'info'
        return(
            <Fragment>
                <FormDialog 
                    name = {categoryName}
                    save = {this.renameCategory}
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
                            list = {userData.filter(item=>item.name!==categoryName)}
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