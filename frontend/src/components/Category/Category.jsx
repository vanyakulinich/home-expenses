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

    deleteCategory = (name)=>{
        this.props.configCategories('DELETE', 'category', configParams(this.props.id, name))
    }
        

    moveCategoryUp = ()=>{
      
        let config = configParams(this.props.id, this.props.categoryName, null, true)
        console.log(config)
        this.props.configCategories('PUT', 'move', config)
    }

    moveCategoryDown = ()=>{
        let config = configParams(this.props.id, this.props.categoryName, null, false)
        this.props.configCategories('PUT', 'move', config)
    }

    renameCategory = (name)=>{
        this.props.configCategories('PUT', 'category', configParams(this.props.id, name))
    }
    render(){
        const {categoryName, children, child, userData} = this.props;
        const buttonColor = (!children && child) ?  'primary'  : 'info'
        return(
            <Fragment>
                <FormDialog 
                    name = {categoryName}
                    save = {this.renameCategory}
                />
                <div>
                 <Button color={buttonColor} onClick={this.moveCategoryUp}>
                     <ArrowUpward/>
                 </Button>
                 <Button color={buttonColor} onClick={this.moveCategoryDown}>
                     <ArrowDownward/>
                 </Button>
                 <AlertDialog 
                    delete = {this.deleteCategory}
                    name = {categoryName} />
                    
                    {(children && child) ? 
                        null : 
                        <SimpleDialogDemo 
                            list = {userData.filter(item=>(item.name!==categoryName) && 
                                                            (item.parent == null) &&
                                                            (!item.children))}
                            parentitem = {userData.find(item=>item.name==categoryName)}
                            color={buttonColor}
                            id={this.props.id}/>}
                </div>
         </Fragment>
        )
    }
}
const mapStateToProps = state=>({
    userData: state.data.userCategories
})

const mapActionsToProps = ({
    configCategories
})


export default connect(mapStateToProps, mapActionsToProps)(Category);